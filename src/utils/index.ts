import { Network } from "../types";
import axios from "axios"
import { Field, ParsedSchema } from "../types/Eas.types";

// Function to parse schema string into a structured format
export const parseSchema = (schema: string): ParsedSchema => {
  console.log("parsing schema", schema);
  const properties = schema.split(",").map(prop => prop.trim());
  const parsedSchema: ParsedSchema = {};

  properties.forEach((property) => {
    const [type, name] = property.trim().split(/\s+/);
    parsedSchema[name] = { type, value: "" };
  });

  console.log("parsed schema", parsedSchema);

  return parsedSchema;
};

 

export const  generateSchema = (fields: Field[]): string => {
    return fields
        .map(field => `${field.type}${field.isArray ? "[]" : ""} ${field.name}`)
        .join(", ");
}
  


export const getSchemaFromUid = async (schemaId: string, network: Network) => {
    console.log("fetching schema")
    let data = JSON.stringify({
        query: `query GetSchema($where: SchemaWhereUniqueInput!) {
        getSchema(where: $where) {
          id
          schema
        }
      }`,
        variables: { "where": { "id": schemaId } }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/graphql',
        headers: {
            'content-type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });

  
}

