import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faGripLines } from '@fortawesome/free-solid-svg-icons'

export default function TouchDnd({ List, setList }) {
  const dragTarget = useRef(null);
  const cloneDragTarget = useRef(null);
  const dragzone = useRef(null);
  const targetTouch = useRef(null);
  const shiftY = useRef(null);
  const dontScroll = useRef(null);
  const insertTargetIndex = useRef(null);
  const [dragMode, setDragMode] = useState(null);
  const [scrollOff, setScrollOff] = useState(true);

  const grab = (e) => {
    if (e.target.id !== "drag") return;
    const target = e.target.parentNode;
    dragTarget.current = target;
    cloneDragTarget.current = target.cloneNode(true);
    cloneDragTarget.current.removeAttribute("index");
    dragzone.current = target.parentNode;
    targetTouch.current = e.targetTouches[0];
    shiftY.current = e.targetTouches[0].clientY - target.getBoundingClientRect().top;
    setDragMode(true);

    console.log("grab - cloneDragTarget.current : ", cloneDragTarget.current);
  };

  const drop = () => {
    console.log("drop - cloneDragTarget.current : ", cloneDragTarget.current);

    if (dragTarget.current === null) return;
    setDragMode(false);
    setScrollOff(true);

    if (cloneDragTarget.current) {
      cloneDragTarget.current.remove();
      console.log("drop - cloneDragTarget.current removed:", cloneDragTarget.current);
    } else {
      console.log("drop - cloneDragTarget.current is null");
    }
  };

  const drag = (e) => {
    // 내가 추가한 부분 : targetTouch를 못받아온다 !!!!
    targetTouch.current = e.targetTouches[0];
    // console.log('targetTouch.current :: ',targetTouch.current);
    if (scrollOff || !dragMode || !targetTouch.current) return;

    // element move
    dragTarget.current.style.top = e.targetTouches[0].pageY - shiftY.current + "px";

    // screen move
    const percent = (e.targetTouches[0].clientY / window.screen.height) * 100;
    if (percent >= 95) window.scrollBy(0, 2);
    if (percent <= 20) window.scrollBy(0, -2);

    // element insert logic
    const compareNode = document
      .elementsFromPoint(
        e.targetTouches[0].pageX - window.pageXOffset,
        e.targetTouches[0].pageY - window.pageYOffset
      )
      .filter((e) => e.attributes.index)[1];
    const newInsertTargetIndex = compareNode?.attributes.index.value;
    if (!newInsertTargetIndex) return;

    const comparPercent = ((e.targetTouches[0].pageY - compareNode.getBoundingClientRect().top) / compareNode.getBoundingClientRect().height) * 100;
    let insertNode = [...dragzone.current.childNodes].filter(
      (e) => e !== cloneDragTarget.current
    );

    if (comparPercent < 50) insertNode = compareNode;
    if (comparPercent >= 50) insertNode = insertNode[+newInsertTargetIndex + 1];
    if (cloneDragTarget.current) cloneDragTarget.current.remove();
    dragzone.current.insertBefore(cloneDragTarget.current, insertNode);

    // update list based on new position
    const targetNodeIndex =
      [...dragzone.current.childNodes]
        .filter((e) => e !== dragTarget.current)
        .map((e, i) => !e.attributes.index && i + 1)
        .filter((x) => x)[0] - 1;
    if (insertTargetIndex.current === null)
      insertTargetIndex.current = targetNodeIndex;
    if (insertTargetIndex.current === targetNodeIndex) return;
    let copyList = [...List];

    [copyList[insertTargetIndex.current], copyList[targetNodeIndex]] = [
      copyList[targetNodeIndex],
      copyList[insertTargetIndex.current]
    ];
    setList(copyList);
    insertTargetIndex.current = targetNodeIndex;
  };

  // touchmove scroll handler
  useEffect(() => {
    dontScroll.current = (e) => {
      if (e.cancelable) {
        e.preventDefault();
        setScrollOff(false);
      } else {
        setScrollOff(true);
      }
    };
    if (dragMode) {
      document.addEventListener("touchmove", dontScroll.current, { passive: false });
    }
    return () => {
      document.removeEventListener("touchmove", dontScroll.current);
    };
  }, [dragMode]);

  // touchmove element move handler
  const dragHandler = useCallback(
    (e) => {
      drag(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollOff, dragMode, List]
  );
  useEffect(() => {
    document.addEventListener("touchmove", dragHandler, { passive: false });
    return () => {
      document.removeEventListener("touchmove", dragHandler);
    };
  }, [dragHandler]);

  // handle state changes
  useEffect(() => {
    if (!scrollOff) {
      if (!targetTouch.current) return;

      dragTarget.current.classList.remove("default");
      dragTarget.current.classList.add("absolute");
      dragTarget.current.style.top = targetTouch.current.pageY - shiftY.current + "px";

      if (cloneDragTarget.current) {
        cloneDragTarget.current.style.opacity = 0;
        const index = dragTarget.current.attributes["index"].value;
        dragzone.current.insertBefore(
          cloneDragTarget.current,
          dragzone.current.childNodes[index]
        );
      }
    } else {
      if (dragMode === null) return;
      dragTarget.current.classList.remove("absolute");
      dragTarget.current.classList.add("default");

      if (cloneDragTarget.current) {
        console.log("scrollOff - cloneDragTarget.current removed:", cloneDragTarget.current);
        cloneDragTarget.current.remove()
      };

      dragTarget.current.style = null;
      cloneDragTarget.current = null;
      dragzone.current = null;
      targetTouch.current = null;
      shiftY.current = null;
      insertTargetIndex.current = null;
    }
  }, [dragMode, scrollOff]);

  return List.map((item, idx) => (
    <RouteDiv key={item.id}             
      onTouchStart={grab}
      onTouchEnd={drop}
      index={idx}
      className="default"
    >
      <div className='route'>
        <span className='placeName'>{item.placeName}</span>
        <div className='detailsWrapper'>
          <span className='placeCate'>{item.placeCate}</span>
          { item.placeRate ? (
            <span className='placeRate'>
              <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}}/>
              {item.placeRate}
            </span>
          ) : null}
        </div>
      </div>
      <FontAwesomeIcon className='gripLines' icon={faGripLines} id="drag"/>
    </RouteDiv>
  ));
}

const RouteDiv = styled.div`
  border-radius: 10px;
  box-shadow: 0px 4px 18px -5px  hsla(234, 44%, 26%, 0.411);
  width: 95%;
  padding: 0.5% 3.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .detailsWrapper {
    gap: 0vw!important;
    justify-content: flex-start;
  }
  & .gripLines {
    margin-right: 4.5%;
  }
`;
