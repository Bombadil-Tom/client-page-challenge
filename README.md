# Client Page Challenge, Frontend Exercise

## Database scheme

* Since PostgreSQL as a database was mentioned I'm assuming there would be tables for `Company`, `VisaType` and `Client`:
```
interface Company {
    id: number;
    name: string;
}

interface VisaType {
    id: number;
    name: string;
}

interface Client {
    id: number;
    fullname: string;
    lastActive: Date;
    company: Company;
    visas: VisaType[];
}
```
* I'm assuming there is a many-to-many relationship table (for example `ClientVisaType`) in the db and there is some 
logic on the backend that pulls the data together and sends it as an array in the REST API.   
* I did not include date fields in any of the db schemes, for example `created_at`, `modified_at`. 

## Mocked api

* I created a mocked api call which returns the data from `src/mockData.ts` after 2sec.: 

```
export const listClientsAPI = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(response);
        }, 2000);
    });
};
```

## Redux 

* A bigger app in mind I added redux for state management (but is probably overkill for a small project):

```
src/store
src/reducers
src/actions
```

## React component lifecycles vs hooks

* I chose react with lifecycle components: 
  * works with older React version 
  * imo easier to understand what happens when (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount` vs `useEffect`)
  * imo more OOP friendly

* If hooks instead of component lifecycles were used, the `useEffect` could have replaced `componentDidMount` and `componentDidUpdate` in `ClientPage.tsx`.

```
import { useEffect, useState } from 'react';

const ClientPage = (props) => {
const [clients, setClients] = useState([]);

    useEffect(() => {
        props.clientPageActions.listClients();
        setClients(props.clientPageReducer.data);
    }, [props.clientPageReducer.data]); 
}
```

## Components and Container logic
* I chose the components and container logic. That way in a bigger app static elements such as a Navigationbar/Sidebar 
or Header can live in containers while presentational elements will live in the component structure. 
* It could be argued that the api call currently living in the `componentDidMount()` of `ClientPage.tsx` could be moved 
to the container level to keep the components more "dumb". The state would then be living in the container and be 
passed down as props to the component. Functions to manipulate the data would also have to be passed down.  

## Sorting

### Sorting in Redux 
* The sorting logic is currently happening inside the class component. It could be moved to the Redux level. 

### Sorting on the FE 
* If the amount of clients becomes too large, sorting can be moved to the backend. 

### Symbols
* The sorting symbols in the table header are not completely accurate. When sorting is activated, there should be only one 
active sorting symbol, the rest should be neutral. Currently, the symbol doesn't jump back to neutral.  

### Visa Type sorting 
* Sorting by visa type currently only sorts alphabetically by the first visa listed. It should probably sort
the visas of one client first and then for all clients. 

