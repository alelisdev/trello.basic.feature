export const onDragEnd = (board, setBoard) => (result) => {
    if (result.type === "list") {
        onDragEndList(board, setBoard, result);
    }
    else if (result.type === "item") {
        onDragEndItem(board, setBoard, result);
    }
};

export const deleteList = (board, setBoard) => (list) => {
    const newBoard = board.filter((item) => item.id !== list.id)
    setBoard(newBoard);
}

const onDragEndItem = (board, setBoard, result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return; 
    if ( source.droppableId === destination.droppableId && source.index === destination.index )
        return; 
    const sourceList = board.find(
        (list) => list.id.toString() === source.droppableId
    );

    const item = sourceList.tasks.find(
        (item) => item.id.toString() === draggableId
    );

    const destinationList = board.find(
        (list) => list.id.toString() === destination.droppableId
    );

    const newItems = [...sourceList.tasks];
    let newItems2;
    if (source.droppableId === destination.droppableId) {
        newItems2 = newItems;
    } else {
        newItems2 = [...destinationList.tasks];
    }
    newItems.splice(source.index, 1);
    newItems2.splice(destination.index, 0, item);

    let newBoard = [];
    board.map((list) => {
        if (list.id === source.droppableId) {
            newBoard.push({
                id: list.id,
                name: list.name,
                description: list.description,
                tasks: newItems
            });
        } else if (list.id === destination.droppableId) {
            newBoard.push({
                id: list.id,
                name: list.name,
                description: list.description,
                tasks: newItems2
            });
        } else {
            newBoard.push(list);
        }
    });
    setBoard(newBoard);
};

const onDragEndList = (board, setBoard, result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return; 
        if (source.index === destination.index) return; 
        const list = board.find(
            (list) => "list" + list.id.toString() === draggableId
        );
        const newBoard = [...board];
        newBoard.splice(source.index, 1);
        newBoard.splice(destination.index, 0, list);
        setBoard(newBoard);
};

export const addList = (board, setBoard) => (list) => {
    const newList = {
        ...list, tasks: []
    }
    const newBoard = [...board, newList];
    setBoard(newBoard);
};

export const updateList = (_ , setBoard) => (updatedList) => {
    setBoard(board => {
        const newBoard = board.map((list) =>
            list.id === updatedList.id ? {
                id: list.id,
                name: updatedList.name,
                description: list.description,
                tasks: list.tasks
            } : list
        );
        return newBoard;
    })
};

export const addCard = (board, setBoard) => (listId, newCard) => {
    const newBoard = board.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newCard] } : list
    );
    setBoard(newBoard);
};

export const updateCard = (_, setBoard) => (listId, updatedCard) => {
    setBoard(board => {
        const targetList = board.find((list) => list.id === listId);

        const newItems = targetList.tasks.map((item) =>
            item.id === updatedCard.id ? updatedCard : item
        );
        const newList = {
            ...targetList,
            tasks: newItems,
        };
        const newBoard = board.map((list) =>
            list.id === newList.id ? newList: list
        );
        return newBoard;
    }); 
};
