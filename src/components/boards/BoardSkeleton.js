import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { v4 as uuidv4 } from "uuid";

export const BoardSkeleton = (props) => {
    const boardTitles = Array(props.count).fill({});

    return (
        <div className="pt-16 bg-blue-500">
            <div className="row">
                {boardTitles.map(() => (
                    <div className='col-lg-3 col-sm-3 col-sx-12' key={uuidv4()}>
                        <div className="bg-gray-200 rounded pt-3">
                            <Skeleton height="1rem" />
                            <Skeleton height="4rem" className="mt-4" />
                            <Skeleton height="4rem" className="mt-2 mb-10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

BoardSkeleton.propTypes = {
    count: PropTypes.number.isRequired,
};
