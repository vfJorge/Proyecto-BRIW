import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";

const connector = new AppSearchAPIConnector({
  searchKey: "search-a8myssqxwghctxodro155a58",
  engineName: "casas",
  endpointBase: "https://deployment1-add21f.ent.us-central1.gcp.cloud.es.io"
});

const config: SearchDriverOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  
  searchQuery: {
    result_fields: {
      titulo: {
        snippet: {
          fallback: true
        }
      },
      descripcion: {
        snippet: {
          fallback: true
        }
      },
      provincia: {
        snippet: {
          fallback: true
        }
      },
      ciudad: { raw: {} },
      precio: { raw: {} },
      
      banos: { raw: {} },
      habitaciones: { raw: {} },
      antiguedad: { raw: {} },
      
    },
    search_fields: {
      titulo: {
        weight: 5
      },
      descripcion: {},
      tipodepropiedad:{},
      provincia: {}

    },
    disjunctiveFacets: ["provincia","ciudad","tipodepropiedad"],
    facets: {
      provincia: { type: "value", size: 30 },
      ciudad: { type: "value", size: 30 },
      tipodepropiedad: { type: "value", size: 30 },
      precio: {
        type: "range",
        ranges: [
          { from: -1, name: "Cualquiera" },
          { from: 0, to: 1000000, name: "0-1,000,000" },
          { from: 1000000, to:2500000, name: "1,000,000-2,500,000" },
          { from: 2500000, to:5000000 , name: "2,500,000-5,000,000" },
          { from: 5000000, to:10000000, name: "5,000,000-10,000,000" },
          { from: 10000001, name: "10,000,000+" },
        ]
      },
      metrostotales:{
        type: "range",
        ranges: [
          { from: -1, name: "Cualquiera" },
          { from: 0, to: 50, name: "0-50 m2" },
          { from: 51, to:100, name: "51-100 m2" },
          { from: 101, to:150 , name: "100-150 m2" },
          { from: 151, to:250, name: "150-250 m2" },
          { from: 250, name: "250+" },
        ]
      },
      
      banos: {
        type: "range",
        ranges: [
          { from: -1, name: "Todos" },
          { from: 1, to:1.5,  name: "1 baño" },
          { from:2, to :2.5, name: "2 baños" },
          { from: 3,  name: "3+ baños" },
        ]
      }
    }
  },

  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          // En qué campos buscar sugerencias
          fields: ["titulo"]
        }
      },
      // Cuántas sugerencias aparecen
      size: 5
    },
    results:{

    }
  },
};



/* const { Client,errors } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: {
    id: 'Deployment1:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDA0MDIxZDNhNGU0ZjQyMTRhNGI4NjJkNTM2MGRjYzJjJDE1NTA0ZWJmMWM2YTRhOWE5MWZlOGIyODJhYzJhNmRl',
  },
  auth: {
    username: 'elastic',
    password: '1aPNn2Hg81mF7KVHmJfKUAce'
  }
})

async function xd(){
  const result = await client.info()
  console.log(result.body)
} */

export default function App() {
  return (
    <div>
    <h1>Proyecto Integrador BRIW</h1>
    <h2>Rodrigo Pantoja,
      Jorge Vázquez,
      Julián Pérez,
      Hebert Negrón
    </h2>
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox  debounceLength={0} 
                  inputProps = "enter text"
                  autocompleteMinimumCharacters = {1}
                  autocompleteSuggestions={{
                    // Types used here need to match types requested from the server
                    documents: {
                      sectionTitle: "Busquedas recomendadas",
                    },
                    popular_queries: {
                      sectionTitle: "Busquedas populares"
                    }
                  }}/>}
                  sideContent={
                    <div>
                      <Facet
                        field="tipodepropiedad"
                        label="Tipo"
                        isFilterable={true}
                      />
                      <Facet
                        field="provincia"
                        label="Provincia"
                        isFilterable={true}
                      />
                      <Facet
                        field="ciudad"
                        label="Ciudad"
                        isFilterable={true}
                      />
              
                      <Facet
                        field="precio"
                        label="Precio"
                        view={SingleSelectFacet}
                      />
                      <Facet
                        field="metrostotales"
                        label="Tamaño del terreno"
                        view={SingleSelectFacet}
                      />
                      <Facet
                        field="banos"
                        label="Baños"
                        view={SingleSelectFacet}
                      />
                      
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="titulo"
                      shouldTrackClickThrough
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
    {/* <button onClick={xd}>
      ajax
    </button> */}

    </div>
  );
}
