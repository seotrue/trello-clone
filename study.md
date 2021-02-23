### 들어 가기전 설계
컴포넌트 구조를 어떻게 나눌 것인가
1. 디자인 패턴  
- container + presnter pattenr :  
    container 컴포넌트와 presenter 컴포넌트를 분리 시킨 패턴
    - container: 논리 담당, 로직과 api를 갖구 잇다 ( 컨테이너는 state도 이해하고, api. 리덕스를 부를 수 있다. state를 변경. 리덕스 액션 불러오고, 액션 디스패치하고,, 등등)
    - presnter: ui담당, 사진 등을 갖고 있다(프레젠터에서는 props에 따라 데이터가 어떻게 보이는지 알려준다.)
    
2. App에 적용할 아키컬처
    - 페이지
    - 리스트
    - 리스트 안의 보드 
    - 작성 
    
    2-1. 세분화
       - 리스트 UI / 로직이 있는 list
###  reducer 구조화          
```
    -board
        lists
    - listsById
        [id]    
            _id
            title
            cards
                0: 카드번호
    - cardByid 
        [id]
            text
            _id
```

###  나만의 학습목표
1. 웹스톰 디버깅 
###  그외에 공부 
- flux 패턴(단방향 데이터 흐름)
    1. 가장 큰 특징은 단방향 데이터 흐름
    데이터 흐름은 항상 Dispatcher에서 Store로, Store에서 View로, View는 Action을 통해 다시 Dispatcher로 데이터가 흐르게 됩니다. 이런 단방향 데이터 흐름은 데이터 변화를 휠씬 예측하기 쉽게 만듭니다. Flux를 크게 Dispatcher, Store, View 세 부분으로 구성됩니다.
- [더비노트](https://beomy.tistory.com/93?category=676748)
- mapStateToProps = (state, ownProps) => ({mapStateToProps에서는 두번째 파라미터 ownProps를 받아올 수 있는데요 이 파라미터는 생략해도 되는 파라미터입니다. 이 값은 우리가 컨테이너 컴포넌트를 렌더링 할때 직접 넣어주는 props 를 가르킵니다. 예를 들어서
                                           
                                           <CounterContainer myValue={1} /> 이라고 하면 { myValue: 1 } 값이 ownProps가 되죠.
                                           
                                           이 두번째 파라미터는 다음과 같은 용도로 활용 할 수 있습니다.
                                           
                                           const mapStateToProps = (state, ownProps) => ({
                                             todo: state.todos[ownProps.id]
                                           })
                                           리덕스에서 어떤 상태를 조회 할 지 설정하는 과정에서 현재 받아온 props에 따라 다른 상태를 조회 할 수 있죠.