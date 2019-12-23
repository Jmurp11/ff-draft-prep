import { Resolver, GraphQLMiddlwareFunc } from "../types/graphql-utils";

export const createMiddleware = (
    middlewareFunc: GraphQLMiddlwareFunc,
    resolverFunc: Resolver
) => (
    parent: any,
    args: any,
    context: any,
    info: any
) => middlewareFunc(
    resolverFunc,
    parent,
    args,
    context,
    info);