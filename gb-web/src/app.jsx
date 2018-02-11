import React, { Component } from 'react';
import Navigation from './components/Navigation';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import UpArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import Popup from './components/Popup'
import Modal from 'react-modal'
import { Debounce } from 'react-throttle';

import ListLoader from 'api/ListLoader.js'

import 'normalize.css';
import 'styles/index.scss';

const domColor = "bg-white-80";
const fontColorA = 'black-90';
const fontColorB = 'black-80';
const DEFAULT_VISIBLE_ROW_COUNT = 20;

const SortOptions = {
	NONE: 'none',
	ASC: 'asc',
	DESC: 'desc'
};

const SortOptionTransitions = {
	none: 'desc',
	desc: 'asc',
	asc: 'desc'
};

//TODO: change this to arrows or something
const SortOptionIcons = {
	none: null,
	desc: <DownArrow/>,
	asc: <UpArrow/>
};

const defaultSortedColumns = {
	region: SortOptions.NONE,
	industry: SortOptions.NONE,
	companyName: SortOptions.NONE,
};

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  selectedIndex: -1,
			showPopup: false,
			searchTerm: null,
			//The number of visible rows
			visibleRowCount: DEFAULT_VISIBLE_ROW_COUNT,
			list: null,

			//Control the sort behavour:
			sortedColumns: defaultSortedColumns
		};
	}

	componentDidMount() {
		ListLoader.load()
		.then(list => {
			this.setState({
				list
			});
		});
	}

	getHeader() {
		return (
			<header className="sans-serif">
			  <div className="cover bg-left bg-center-l">
			    <div className={`${domColor} pb3 pb4-m pb5-l`}>
			      <nav className="dt w-100 mw8 center">
							<div className="dtc w2 v-mid pa3">
			          <a href="/" className="dib w2 h2 pa1 ba b--white-90 grow-large border-box">
			          </a>
			        </div>
			        {/* <div className="dtc v-mid tr pa3">
			          <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >How it Works</a>
			          <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Pricing</a>
			          <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >About</a>
			          <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Careers</a>
			          <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="/" >Sign Up</a>
			        </div> */}
			      </nav>
			      <div className="tc mt2 mt3-m mt4-l ph3">
			        <h1 className={`f2 f1-l fw2 ${fontColorA} mb0 lh-title`}>GoodBlocks</h1>
			        <h2 className={`fw1 f3 ${fontColorB} mt3`}>Browse Blockchain for Social Good Projects from the Master List</h2>
			        <h3 className={`fw1 f5 ${fontColorB}`}>Made with ❤️ by Vessels Tech</h3>
							<a className={`fw1 f6 ${fontColorB}`} href="https://vesselstech.com">vesselstech.com</a>
			        {/* <a className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3" href="/">Call to Action</a> */}
			        {/* <span className="dib v-mid ph3 white-70 mb3">or</span> */}
			        {/* <a className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3" href="">Secondary call to action</a> */}
			      </div>
			    </div>
			  </div>
			</header>
		);
	}

	getSearchBar() {
		return (
			<section className={`${domColor} w-80-ns center pa3 mt4`}>
				<div className="cf">
					<div className="fl w-100 tc">
						<Debounce time="400" handler="onChange">
							<TextField
								fullWidth={true}
								hintText={"Filter by Project Name, Industry or Region."}
								onChange={(event, newValue) => {
									console.log("changing stuff");
									this.setState({searchTerm: newValue})
								}}
							/>
						</Debounce>
					</div>
				</div>
			</section>
		);
	}

  isSelected = (index) => {
		return false;
  };

	handleRowSelection = (selectedRows, other) => {
    this.setState({
      selected: selectedRows[0],
			showPopup: true,
    });
  }

	loadMoreRows = () => {
		let { visibleRowCount, list } = this.state;
		visibleRowCount += DEFAULT_VISIBLE_ROW_COUNT;

		this.setState({
			visibleRowCount,
		});
	}

	updateSortOptions = (columnName) => {
		const { sortedColumns } = this.state;

		const currentValue = sortedColumns[columnName];
		const nextValue = SortOptionTransitions[currentValue];

		//reset the other columns
		const newSortedColumns = Object.assign({}, defaultSortedColumns);
		newSortedColumns[columnName] = nextValue;

		this.setState({
			sortedColumns: newSortedColumns
		});
	}

	filterTableRow(row) {
		const { searchTerm } = this.state;

		if (!searchTerm) {
			return true;
		}

		const lowerSearchTerm = searchTerm.toLowerCase();
		return row.searchable.indexOf(lowerSearchTerm) > -1;
	}

	formatTableRow(row) {
		return (
			<TableRow
				key={row.uniqueId}
				selected={this.isSelected(row.id)}>
				<TableRowColumn
					>{row.companyName}</TableRowColumn>
				<TableRowColumn>{row.industry}</TableRowColumn>
				<TableRowColumn>{row.region}</TableRowColumn>
			</TableRow>
		)
	}

	getSortIconForName = (column) => {
		const { sortedColumns } = this.state;

		return SortOptionIcons[sortedColumns[column]];
	}

	compareRows = (rowA, rowB) => {
		const { sortedColumns } = this.state;

		//Figure out which column is being sorted on...
		const sortField = Object.keys(sortedColumns).reduce((acc, curr) => {
			if (acc) {
				return acc;
			}

			if (sortedColumns[curr] !== SortOptions.NONE) {
				return curr;
			}

			return null
		}, null);

		if (!sortField) {
			return 0;
		}

		const order = sortedColumns[sortField];


		if (rowA[sortField] > rowB[sortField]) {
			return order === SortOptions.DESC ? 1 : -1
		}

		if (rowA[sortField] < rowB[sortField]) {
			return order === SortOptions.DESC ? -1 : 1
		}

		return 0;
	}

	getList() {
		const { list, visibleRowCount } = this.state;

		if (!list) {
			return (
				//TODO: make pretty
				<section className={`${domColor} mw-80-ns w-80-ns center mt4`}>
					<div
						className="mw1 mw1-ns center"
						style={{position:'relative'}}
						>
						<RefreshIndicator
							 size={60}
							 left={-30}
							 top={15}
							 status={'loading'}
							 style={{marginLeft: '50%'}}
						 />
					</div>
				</section>
			);
		}

		const filteredList = list
			.filter(row => this.filterTableRow(row))
			.sort(this.compareRows)
			.slice(0, visibleRowCount);
		const shouldHideMoreButton = filteredList.length < visibleRowCount;

		return (
			<section className="bg-white-80 mw-80-ns w-80-ns center mt4">
				<Table
					onRowSelection={this.handleRowSelection}
					selectable={true}
					style={{
						backgroundColor:null,
						fontFamily: 'sans-serif'

					}}
					>
	        <TableHeader
						displayRowCheckbox={false}
						displaySelectAll={false}
						adjustForCheckbox={false}
						>
	          <TableRow>
							<TableHeaderColumn>
								<FlatButton
									primary
									className="red"
									onClick={() => this.updateSortOptions('companyName')}
									icon={this.getSortIconForName('companyName')}
								>
									Organization
								</FlatButton>
							</TableHeaderColumn>
							<TableHeaderColumn>
								<FlatButton
									primary
									onClick={() => this.updateSortOptions('industry')}
						      icon={this.getSortIconForName('industry')}
								>
									Industry
								</FlatButton>
							</TableHeaderColumn>
	            <TableHeaderColumn>
								<FlatButton
									primary
									onClick={() => this.updateSortOptions('region')}
						      icon={this.getSortIconForName('region')}
								>
									Region
								</FlatButton>
							</TableHeaderColumn>
	          </TableRow>
	        </TableHeader>
	        <TableBody
						displayRowCheckbox={false}
						>
						{
							filteredList.map(row => this.formatTableRow(row))
						}
	        </TableBody>
	      </Table>
				{
					shouldHideMoreButton ? null :
						<RaisedButton
							className="mt3"
							label="MORE"
							fullWidth={true}
							onClick={() => this.loadMoreRows()}
						/>
				}
			</section>
		);
	}

	closePopup() {
		this.setState({
			selected: -1,
			showPopup: false
		});
	}

	getPopupContents(row) {
		if (!row) {
			return null;
		}

		return (
			<Popup
				id={row.id}
				uniqueId={row.uniqueId}
				description={row.description}
				companyName={row.companyName}
				orgInit={row.orgInit}
			/>
		);
	}


	getPopup() {
		const { showPopup, list, selected, visibleRowCount } = this.state;

		if (!list) {
			return null;
		}

		const filteredList = list
			.filter(row => this.filterTableRow(row))
			.sort(this.compareRows)
			.slice(0, visibleRowCount);

		const row = filteredList[selected];

		const customStyles = {
			  content : {
			    top: '50%',
			    left: '50%',
			    right: 'auto',
			    bottom: 'auto',
			    marginRight: '-50%',
			    transform: 'translate(-50%, -50%)',
					padding: '0',
					width: '80%'
			  }
			};

		return (
			<Modal
				// className="top-50 left-50 mw6-ns w6-ns mw5 w5"
        isOpen={this.state.showPopup}
        onRequestClose={() => this.closePopup()}
        contentLabel="Example Modal"
        style={customStyles}
				ariaHideApp={false}
      >
				{this.getPopupContents(row)}
			</Modal>
		)
	}

	render() {
		return (
			<div className='App'>
				{/* <Navigation/> */}
				{this.getHeader()}
				{this.getSearchBar()}
				{this.getList()}
				{this.getPopup()}
			</div>
		);
	}
}

export default App;