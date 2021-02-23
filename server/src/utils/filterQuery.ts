import { Brackets, WhereExpression, SelectQueryBuilder } from "typeorm";

export interface FieldOptions {
    startsWith?: string;
    endsWith?: string;
    contains?: string;
    in?: any;
    is?: any;
    not?: any;
    notIn?: any;
    lt?: any;
    lte?: any;
    gt?: any;
    gte?: any;
    notContains?: any;
    notStartsWith?: any;
    notEndsWith?: any;
    isNull?: any;
    isNotNull?: any;
}

export interface Fields {
    fieldTable: string,
    fieldName: string,
    fieldOptions: FieldOptions
}

export interface Where {
    OR?: Fields[];
    AND?: Fields[];
}

const handleArgs = (
    query: WhereExpression,
    where: Where,
    andOr: "andWhere" | "orWhere"
) => {
    const whereArgs = Object.entries(where);
    whereArgs.map(whereArg => {
        const [fieldName, filters] = whereArg;
        const ops = Object.entries(filters);
        ops.map(parameters => {
            const [operation, value] = parameters;
            // BUG, query is overwriting value if multiple of same operation are used
            // resolved by removing use of object literal parameter
            switch (operation) {
                case "is": {
                    query[andOr](`${fieldName} = ${value}`);
                    break;
                }
                case "not": {
                    query[andOr](`${fieldName} != ${value}`);
                    break;
                }
                case "in": {
                    query[andOr](`${fieldName} IN (${value})`);
                    break;
                }
                case "notIn": {
                    query[andOr](`${fieldName} NOT IN ${value}`);
                    break;
                }
                case "lt": {
                    query[andOr](`${fieldName} < ${value}`);
                    break;
                }
                case "lte": {
                    query[andOr](`${fieldName} <= ${value}`);
                    break;
                }
                case "gt": {
                    query[andOr](`${fieldName} > ${value}`);
                    break;
                }
                case "gte": {
                    query[andOr](`${fieldName} >= ${value}`);
                    break;
                }
                case "contains": {
                    query[andOr](`${fieldName} ILIKE '%${value}%'`);
                    break;
                }
                case "notContains": {
                    query[andOr](`${fieldName} NOT ILIKE '%${value}%'`);
                    break;
                }
                case "startsWith": {
                    query[andOr](`${fieldName} ILIKE '${value}%'`);
                    break;
                }
                case "notStartsWith": {
                    query[andOr](`${fieldName} NOT ILIKE '${value}%'`);
                    break;
                }
                case "endsWith": {
                    query[andOr](`${fieldName} ILIKE '%${value}'`);
                    break;
                }
                case "notEndsWith": {
                    query[andOr](`${fieldName} ILIKE '%${value}'`);
                    break;
                }
                case "isNull": {
                    query[andOr](`${fieldName} is NULL`);
                    break;
                }
                case "isNotNull": {
                    query[andOr](`${fieldName} is NOT NULL`);
                    break;
                }
                default: {
                    break;
                }
            }
        });
    });

    return query;
};

export const filterQuery = <T>(query: SelectQueryBuilder<T>, where: Where | undefined) => {
    if (!where) {
        return query;
    }

    Object.keys(where).forEach(key => {
        if (key === "OR") {
            query.andWhere(
                new Brackets(qb =>
                    where[key]!.map(queryArray => {
                        const fieldFilter = {
                            [queryArray.fieldTable + "." + queryArray.fieldName]: queryArray.fieldOptions
                        };
                        handleArgs(qb, fieldFilter, "orWhere");
                    })
                )
            );
        } else if (key === "AND") {
            query.andWhere(
                new Brackets(qb =>
                    where[key]!.map(queryArray => {
                        const fieldFilter = {
                            [queryArray.fieldTable + "." + queryArray.fieldName]: queryArray.fieldOptions
                        };
                        handleArgs(qb, fieldFilter, "andWhere");
                    })
                )
            );
        }
    });

    return query;
};