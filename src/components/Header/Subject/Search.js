import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
    onSubmit: PropTypes.func,
};

Search.defaultProps = {
    onSubmit: null,
}

function Search(props) {

    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;


        //set -- 100 -- clear, set -- 300 -> SUBMIT
        //SET -- 300 => SUBMIT
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        }, 2000);

    }

    return (
        <form>
            <input type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search..."
                className="border-2 rounded-lg float-right mr-16 mb-10 border-xanhla w-64  my-auto outline-none p-5 h-10   mt-5"
            />
          


        </form>
    )
}
export default Search;