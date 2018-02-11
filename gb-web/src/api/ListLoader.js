import GetSheetDone from 'get-sheet-done';


const DOC_KEY = "14BPQIqnDUTyinkp9eJ7bwYwsg22RJz0AVU9vOSSU94o";

//a list of manually filtered ids:
const excludedIds = [
  //just an example
  '210'
];

//map the rows to fields
const rowFormat = {
	id: 0,
	companyName: 1,
	projectName: 2, //unclear, might also be description
	region: 3,
	industry: 4,
	targetMarket: 5,
	description: 6,
	tech: 7,
	projectStatus: 8,
	link: 9,
	contactEmail: 10

}

const extractDataFromRow = (row) => {

	const id = row[rowFormat.id] || null;
	const companyName = row[rowFormat.companyName] || null;

	const formattedRow = {
		id,
		companyName,
		//combined field: Organization [| Initiative]
		orgInit: null,
		//just in case someone wasn't so diligent
		uniqueId: `${id}-${companyName}`,
		companyName: row[rowFormat.companyName] || null,
		projectName: row[rowFormat.projectName] || null,
		region: row[rowFormat.region] || null,
		industry: row[rowFormat.industry] || null,
		targetMarket: row[rowFormat.targetMarket] || null,
		description: row[rowFormat.description] || null,
		tech: row[rowFormat.tech] || null,
		projectStatus: row[rowFormat.projectStatus] || null,
		link: row[rowFormat.link] || null,
		contactEmail: row[rowFormat.contactEmail] || null,
	};


	let orgInit = formattedRow.companyName;
	if (formattedRow.projectName) {
		orgInit = `${formattedRow.companyName} | ${formattedRow.projectName}`;
	}
	formattedRow.orgInit = orgInit;

	//Add a searchable field
	const searchable = Object.keys(formattedRow).reduce((acc, curr) => {
		const currentValue = formattedRow[curr];
		if (!currentValue) {
			return acc;
		}

		return `${acc} ${currentValue.toLowerCase()}`;
	}, '');

	formattedRow.searchable = searchable;


	return formattedRow;
}

/**
 * Load the list, filter out bad rows and format nicely.
 * returns Promise<Array>
 */
const load = () => {
	//Load the data!
	return GetSheetDone.raw(DOC_KEY)
	.then(sheet => {
		console.log(sheet)
		console.log(sheet.data[6]);

		return sheet.data
	})
	.then(rows => {
		return rows
			.map(row => extractDataFromRow(row))
			.filter(mappedRow => {
				if (!mappedRow.description) {
					return false;
				}

				if (mappedRow.description.length < 5) {
					return false;
				}

        if (!mappedRow.id || mappedRow.id.length === 0) {
          return false;
        }

        if (mappedRow.id === "ID") {
          return false;
        }

        if (excludedIds.indexOf(mappedRow.id) > -1) {
          return false;
        }

				return true;
			});
	});
}

const api = {
	load
}


export default api;
