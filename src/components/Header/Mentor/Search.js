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

    async function handleSearchTermChange(e) {
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
        }, 1000);
   
    }

    return (
        <form>
            <input type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search"
                className="border-2 rounded-lg float-right mr-16 w-64  my-auto outline-none p-5 h-10 border-gray-300   mt-5"
            />
            <image className="float-right clear-right mr-20 -mt-34 cursor-pointer" >
                <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.3543 20.7673L21.3061 16.0903C21.0783 15.8792 20.7694 15.7619 20.4453 15.7619H19.62C21.0175 14.106 21.8479 12.0231 21.8479 9.75737C21.8479 4.36736 17.1339 0 11.3162 0C5.49839 0 0.784424 4.36736 0.784424 9.75737C0.784424 15.1474 5.49839 19.5147 11.3162 19.5147C13.7617 19.5147 16.0099 18.7454 17.7972 17.4507V18.2153C17.7972 18.5156 17.9238 18.8017 18.1517 19.0128L23.1998 23.6898C23.6757 24.1307 24.4454 24.1307 24.9163 23.6898L26.3492 22.3622C26.8251 21.9213 26.8251 21.2082 26.3543 20.7673ZM11.3162 15.7619C7.73638 15.7619 4.83509 13.0786 4.83509 9.75737C4.83509 6.4408 7.73132 3.75284 11.3162 3.75284C14.8959 3.75284 17.7972 6.43611 17.7972 9.75737C17.7972 13.0739 14.901 15.7619 11.3162 15.7619Z" fill="black" />
                </svg>
            </image>


        </form>
    )
}
export default Search;