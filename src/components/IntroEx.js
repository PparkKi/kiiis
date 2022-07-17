import React from "react";

const IntroEx = () => {
  return (
    <>
      <div className="mb-3">
        <h1 className="text-s15 text-bold mb-1">
          포트폴리오 카페공간은 이렇게 만들었어요!
        </h1>
        <br />
        <ul className="list-style-dot pl-1rem lh-2">
          <li>React를 사용하여 UI를 구축하였습니다</li>
          <li>UI를 구현하는 데에 부분적으로 Mui 라이브러리를 활용했습니다</li>
          <li>
            데이터베이스는 Firebase를 사용하여 유저 정보, 데이터를 관리했습니다
          </li>
          <li>
            상태 관리는 React Redux의 useDispatch, useSelector를 사용했습니다
          </li>
          <li>
            Redux의 모든 기능을 사용하진 않았으며 이유는 아직 그 기능들에 대해서
            지식이 없어서입니다..
          </li>
          <li>
            React persist 라이브러리로 데이터를 LocalStorage에 저장하여
            새로고침했을 때에도 데이터를 유지하였습니다
          </li>
          <li>
            React responsive, mediaQuery를 활용해서 반응형으로 구현하였습니다
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <h1 className="text-s15 text-bold mb-1">또 이렇게 구현해 봤어요!</h1>
        <br />
        <ul className="list-style-dot pl-1rem lh-2">
          <li>
            "카페공간" 상세페이지는 인스타그램의 상세페이지 레이아웃을
            벤치마킹했어요
          </li>
          <li>
            CSS나 Component 구조는 클론코딩 및 강의 영상의 코드를 가져온것이
            아닌 순수 본인 스스로 코딩했어요
          </li>
          <li>Filter로 카페의 이름, 주소를 선택하여 검색할 수 있도록 했어요</li>
          <li>카페 상세페이지 이미지는 masonry 형태로 정렬해 봤어요</li>
          <li>React image crop으로 이미지 편집(자르기) 기능을 추가했어요</li>
          <li>Kakao map api로 카페의 위치를 추가했어요</li>
          <li>카페 등록은 admin(본인) 계정으로만 등록이 가능하도록 했어요</li>
        </ul>
      </div>

      <div className="mb-3">
        <h1 className="text-s15 text-bold mb-1">
          컴포넌트 구조는 이렇게 나눴어요!
        </h1>
        <br />
        <ul className="list-style-dot pl-1rem lh-2">
          <li>모든 페이지에 공통적으로 적용되는 Header, Footer</li>
          <li>DB로부터 데이터를 받아오는 컴포넌트</li>
          <li>새로운 데이터를 DB에 쌓아주는 컴포넌트</li>
          <li>받아온 데이터로 화면에 그려주는 View 컴포넌트</li>
          <li>대체적으로 위와 같이 컴포넌트를 구조화하였습니다!</li>
        </ul>
      </div>
    </>
  );
};

export default IntroEx;
