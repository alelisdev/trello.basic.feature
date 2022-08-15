import PropTypes from 'prop-types';

export const BoardTitle = ({
    title,
    handleBoardClick,
    handleEdit,
    handleDelete,
    addition
}) => (
    <div className="d-flex flex-column board">
        <div
            role="button"
            tabIndex="0"
            onKeyDown={() => { }}
            onClick={() => handleBoardClick()}
            className={`d-flex ${addition ? 'bg-new' : 'bg-item'}`}
        >
            <div className={`m-auto ${addition ? '' : ''}`}>{title}</div>
        </div>
        {!addition && (
            <div
                role="button"
                tabIndex="-1"
                className="flex"
                onKeyDown={(e) => { 
                    e.stopPropagation();
                    handleEdit();
                    }}
            >
                <div className="dropdown" style={{ float:'right'}}>
                    <button className="drop-btn">...</button>
                    <div className="dropdown-content">
                        <a onClick={handleEdit}><i className='fa fa-edit'></i> Edit</a>
                        <a onClick={handleDelete}><i className='fa fa-trash'></i> Delete</a>
                    </div>
                </div>
            </div>
        )}
    </div>
);

BoardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    addition: PropTypes.bool,
    handleBoardClick: PropTypes.func,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func
};
