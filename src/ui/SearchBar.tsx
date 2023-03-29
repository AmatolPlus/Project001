import * as React from 'react';
import {Searchbar as RPSearchBar} from 'react-native-paper';

import {ISearchBar} from '../types/SearchBar';

const SearchBar = (props: ISearchBar) => <RPSearchBar {...props} />;

export default SearchBar;
