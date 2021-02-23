```angular2

const bord = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_LIST: {
            const { listId } = action.payload;
            return {
                ...state,
                lists: [...state.lists, listId]
            }
        }
        case MOVE_LIST: {
            const { oldListIndex, newListIndex } = action.payload;
            // 기존리스트
            const newLists = Array.from(state.lists);
            // 기존 리스트에서 삭제한다 보드를
            const [removedList] = newLists.splice(oldListIndex,1);
            newLists.splice(newListIndex,0, removedList);
            return {
                lists: newLists
            }
        }
        case DELETE_LIST: {
            const { listId } = action.payload;
            const filterDeleted = tmpListId => tmpListId !== listId;
            const newLists = state.lists.filter(filterDeleted);
            return {
                lists: newLists
            }
        }
        default:
            return state
    }
}



```



```angular2

항상 브라우저로 에러로 확인 하는 것이 아닌 
미리 코드에서 방지할수 있다.

에러 사전 방지
타입 정의 장점







const listsById = (state = {}, action) => {
    switch (action.type) {
        case ADD_LIST: {
            const { listId, listTitle  } = action.payload;
            return {
                ...state,
                [listId] : {
                    _id: listId,
                    title: listTitle,
                    cards: []
                }
            };
        }

        case CHANGE_LIST_TITLE: {
            const { listId, listTitle } = action.payload;
            return {
                ...state,
                [listId]: { ...state[listId], title: listTitle }
            };
        }
        // todo: restOfLists???????????????
        case DELETE_LIST: {
            const { listId } = action.payload;
            const { [listId]: deletedList, ...restOfLists } = state;
            return restOfLists
        }

        case ADD_CARD: {
            const { listId, cardId } = action.payload;
            return {
                ...state,
                [listId]: {
                    ...state[listId],
                    cards: [...state[listId].cards, cardId]
                }
            }
        }
        // todo: sourceListId, destListId 먼지 확인
        case MOVE_CARD: {
            const {
                oldCardIndex,
                newCardIndex,
                sourceListId, // 원래 잇던 리스트 Id
                destListId // 이동한 리스트 Id
            } = action.payload;

            // 동일한 목록 내에서 이동
            if (sourceListId === destListId) {
                const newCard = Array.from(state[sourceListId].cards); // 기존 목록 복사
                const [removedCard] = newCard.splice(oldCardIndex,1); // 움직인 카드 인덱스 삭제
                newCard.splice(newCardIndex,0,removedCard) // 이동한 카드순서에 추가

                return {
                    ...state,
                    [sourceListId] : {
                        ...state[sourceListId],
                        cards: newCard
                    }
                }
            }

            // 한 목록에서 다른 목록으로 이동
            const sourceCards = Array.from(state[sourceListId].cards); // r기존 카드 목록
            const [removedCard] = sourceCards.splice(oldCardIndex,1); // 움직인 카드의 기존 카드 리스트카트 목록에서의 이동할 카드 목록 삭제
            const destinationCards = Array.from(state[destListId].cards) // 이동할 리스트의 카드 목록

            destinationCards.splice(newCardIndex,0,removedCard);
            return {
                ...state,
                // 기존 목록의 카드목록에서 삭제
                [sourceListId] : {
                    ...state[sourceListId],
                    cards: sourceCards
                },
                // 추가 할 목록에서의 카드 목록 추가
                [destListId]: {
                    ...state[destListId],
                    cards: destinationCards
                }
            };
        }

        case DELETE_CARD: {
            const { cardId: deletedCardId, listId } = action.payload;
            const filterDeleted  = cardId => cardId !== deletedCardId;

            return {
                ...state,
                [listId]: {
                    ...state[listId],
                    cards:state[listId].cards.filter(filterDeleted)
                }
            }
        }
        default:
            return state
    }
}
```