
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MilitaryRank
 * 
 */
export type MilitaryRank = $Result.DefaultSelection<Prisma.$MilitaryRankPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MilitaryRanks
 * const militaryRanks = await prisma.militaryRank.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MilitaryRanks
   * const militaryRanks = await prisma.militaryRank.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.militaryRank`: Exposes CRUD operations for the **MilitaryRank** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MilitaryRanks
    * const militaryRanks = await prisma.militaryRank.findMany()
    * ```
    */
  get militaryRank(): Prisma.MilitaryRankDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MilitaryRank: 'MilitaryRank'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "militaryRank"
      txIsolationLevel: never
    }
    model: {
      MilitaryRank: {
        payload: Prisma.$MilitaryRankPayload<ExtArgs>
        fields: Prisma.MilitaryRankFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MilitaryRankFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MilitaryRankFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload>
          }
          findFirst: {
            args: Prisma.MilitaryRankFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MilitaryRankFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload>
          }
          findMany: {
            args: Prisma.MilitaryRankFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload>[]
          }
          create: {
            args: Prisma.MilitaryRankCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload>
          }
          createMany: {
            args: Prisma.MilitaryRankCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MilitaryRankDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload>
          }
          update: {
            args: Prisma.MilitaryRankUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload>
          }
          deleteMany: {
            args: Prisma.MilitaryRankDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MilitaryRankUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MilitaryRankUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilitaryRankPayload>
          }
          aggregate: {
            args: Prisma.MilitaryRankAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMilitaryRank>
          }
          groupBy: {
            args: Prisma.MilitaryRankGroupByArgs<ExtArgs>
            result: $Utils.Optional<MilitaryRankGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MilitaryRankFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MilitaryRankAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MilitaryRankCountArgs<ExtArgs>
            result: $Utils.Optional<MilitaryRankCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    militaryRank?: MilitaryRankOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model MilitaryRank
   */

  export type AggregateMilitaryRank = {
    _count: MilitaryRankCountAggregateOutputType | null
    _avg: MilitaryRankAvgAggregateOutputType | null
    _sum: MilitaryRankSumAggregateOutputType | null
    _min: MilitaryRankMinAggregateOutputType | null
    _max: MilitaryRankMaxAggregateOutputType | null
  }

  export type MilitaryRankAvgAggregateOutputType = {
    order: number | null
  }

  export type MilitaryRankSumAggregateOutputType = {
    order: number | null
  }

  export type MilitaryRankMinAggregateOutputType = {
    id: string | null
    abbreviation: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilitaryRankMaxAggregateOutputType = {
    id: string | null
    abbreviation: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilitaryRankCountAggregateOutputType = {
    id: number
    abbreviation: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MilitaryRankAvgAggregateInputType = {
    order?: true
  }

  export type MilitaryRankSumAggregateInputType = {
    order?: true
  }

  export type MilitaryRankMinAggregateInputType = {
    id?: true
    abbreviation?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilitaryRankMaxAggregateInputType = {
    id?: true
    abbreviation?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilitaryRankCountAggregateInputType = {
    id?: true
    abbreviation?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MilitaryRankAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MilitaryRank to aggregate.
     */
    where?: MilitaryRankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MilitaryRanks to fetch.
     */
    orderBy?: MilitaryRankOrderByWithRelationInput | MilitaryRankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MilitaryRankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MilitaryRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MilitaryRanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MilitaryRanks
    **/
    _count?: true | MilitaryRankCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MilitaryRankAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MilitaryRankSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MilitaryRankMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MilitaryRankMaxAggregateInputType
  }

  export type GetMilitaryRankAggregateType<T extends MilitaryRankAggregateArgs> = {
        [P in keyof T & keyof AggregateMilitaryRank]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMilitaryRank[P]>
      : GetScalarType<T[P], AggregateMilitaryRank[P]>
  }




  export type MilitaryRankGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilitaryRankWhereInput
    orderBy?: MilitaryRankOrderByWithAggregationInput | MilitaryRankOrderByWithAggregationInput[]
    by: MilitaryRankScalarFieldEnum[] | MilitaryRankScalarFieldEnum
    having?: MilitaryRankScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MilitaryRankCountAggregateInputType | true
    _avg?: MilitaryRankAvgAggregateInputType
    _sum?: MilitaryRankSumAggregateInputType
    _min?: MilitaryRankMinAggregateInputType
    _max?: MilitaryRankMaxAggregateInputType
  }

  export type MilitaryRankGroupByOutputType = {
    id: string
    abbreviation: string
    order: number
    createdAt: Date
    updatedAt: Date
    _count: MilitaryRankCountAggregateOutputType | null
    _avg: MilitaryRankAvgAggregateOutputType | null
    _sum: MilitaryRankSumAggregateOutputType | null
    _min: MilitaryRankMinAggregateOutputType | null
    _max: MilitaryRankMaxAggregateOutputType | null
  }

  type GetMilitaryRankGroupByPayload<T extends MilitaryRankGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MilitaryRankGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MilitaryRankGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MilitaryRankGroupByOutputType[P]>
            : GetScalarType<T[P], MilitaryRankGroupByOutputType[P]>
        }
      >
    >


  export type MilitaryRankSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    abbreviation?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["militaryRank"]>



  export type MilitaryRankSelectScalar = {
    id?: boolean
    abbreviation?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MilitaryRankOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "abbreviation" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["militaryRank"]>

  export type $MilitaryRankPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MilitaryRank"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      abbreviation: string
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["militaryRank"]>
    composites: {}
  }

  type MilitaryRankGetPayload<S extends boolean | null | undefined | MilitaryRankDefaultArgs> = $Result.GetResult<Prisma.$MilitaryRankPayload, S>

  type MilitaryRankCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MilitaryRankFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MilitaryRankCountAggregateInputType | true
    }

  export interface MilitaryRankDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MilitaryRank'], meta: { name: 'MilitaryRank' } }
    /**
     * Find zero or one MilitaryRank that matches the filter.
     * @param {MilitaryRankFindUniqueArgs} args - Arguments to find a MilitaryRank
     * @example
     * // Get one MilitaryRank
     * const militaryRank = await prisma.militaryRank.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MilitaryRankFindUniqueArgs>(args: SelectSubset<T, MilitaryRankFindUniqueArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MilitaryRank that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MilitaryRankFindUniqueOrThrowArgs} args - Arguments to find a MilitaryRank
     * @example
     * // Get one MilitaryRank
     * const militaryRank = await prisma.militaryRank.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MilitaryRankFindUniqueOrThrowArgs>(args: SelectSubset<T, MilitaryRankFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MilitaryRank that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilitaryRankFindFirstArgs} args - Arguments to find a MilitaryRank
     * @example
     * // Get one MilitaryRank
     * const militaryRank = await prisma.militaryRank.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MilitaryRankFindFirstArgs>(args?: SelectSubset<T, MilitaryRankFindFirstArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MilitaryRank that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilitaryRankFindFirstOrThrowArgs} args - Arguments to find a MilitaryRank
     * @example
     * // Get one MilitaryRank
     * const militaryRank = await prisma.militaryRank.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MilitaryRankFindFirstOrThrowArgs>(args?: SelectSubset<T, MilitaryRankFindFirstOrThrowArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MilitaryRanks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilitaryRankFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MilitaryRanks
     * const militaryRanks = await prisma.militaryRank.findMany()
     * 
     * // Get first 10 MilitaryRanks
     * const militaryRanks = await prisma.militaryRank.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const militaryRankWithIdOnly = await prisma.militaryRank.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MilitaryRankFindManyArgs>(args?: SelectSubset<T, MilitaryRankFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MilitaryRank.
     * @param {MilitaryRankCreateArgs} args - Arguments to create a MilitaryRank.
     * @example
     * // Create one MilitaryRank
     * const MilitaryRank = await prisma.militaryRank.create({
     *   data: {
     *     // ... data to create a MilitaryRank
     *   }
     * })
     * 
     */
    create<T extends MilitaryRankCreateArgs>(args: SelectSubset<T, MilitaryRankCreateArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MilitaryRanks.
     * @param {MilitaryRankCreateManyArgs} args - Arguments to create many MilitaryRanks.
     * @example
     * // Create many MilitaryRanks
     * const militaryRank = await prisma.militaryRank.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MilitaryRankCreateManyArgs>(args?: SelectSubset<T, MilitaryRankCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MilitaryRank.
     * @param {MilitaryRankDeleteArgs} args - Arguments to delete one MilitaryRank.
     * @example
     * // Delete one MilitaryRank
     * const MilitaryRank = await prisma.militaryRank.delete({
     *   where: {
     *     // ... filter to delete one MilitaryRank
     *   }
     * })
     * 
     */
    delete<T extends MilitaryRankDeleteArgs>(args: SelectSubset<T, MilitaryRankDeleteArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MilitaryRank.
     * @param {MilitaryRankUpdateArgs} args - Arguments to update one MilitaryRank.
     * @example
     * // Update one MilitaryRank
     * const militaryRank = await prisma.militaryRank.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MilitaryRankUpdateArgs>(args: SelectSubset<T, MilitaryRankUpdateArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MilitaryRanks.
     * @param {MilitaryRankDeleteManyArgs} args - Arguments to filter MilitaryRanks to delete.
     * @example
     * // Delete a few MilitaryRanks
     * const { count } = await prisma.militaryRank.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MilitaryRankDeleteManyArgs>(args?: SelectSubset<T, MilitaryRankDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MilitaryRanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilitaryRankUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MilitaryRanks
     * const militaryRank = await prisma.militaryRank.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MilitaryRankUpdateManyArgs>(args: SelectSubset<T, MilitaryRankUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MilitaryRank.
     * @param {MilitaryRankUpsertArgs} args - Arguments to update or create a MilitaryRank.
     * @example
     * // Update or create a MilitaryRank
     * const militaryRank = await prisma.militaryRank.upsert({
     *   create: {
     *     // ... data to create a MilitaryRank
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MilitaryRank we want to update
     *   }
     * })
     */
    upsert<T extends MilitaryRankUpsertArgs>(args: SelectSubset<T, MilitaryRankUpsertArgs<ExtArgs>>): Prisma__MilitaryRankClient<$Result.GetResult<Prisma.$MilitaryRankPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MilitaryRanks that matches the filter.
     * @param {MilitaryRankFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const militaryRank = await prisma.militaryRank.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MilitaryRankFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MilitaryRank.
     * @param {MilitaryRankAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const militaryRank = await prisma.militaryRank.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MilitaryRankAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MilitaryRanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilitaryRankCountArgs} args - Arguments to filter MilitaryRanks to count.
     * @example
     * // Count the number of MilitaryRanks
     * const count = await prisma.militaryRank.count({
     *   where: {
     *     // ... the filter for the MilitaryRanks we want to count
     *   }
     * })
    **/
    count<T extends MilitaryRankCountArgs>(
      args?: Subset<T, MilitaryRankCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MilitaryRankCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MilitaryRank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilitaryRankAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MilitaryRankAggregateArgs>(args: Subset<T, MilitaryRankAggregateArgs>): Prisma.PrismaPromise<GetMilitaryRankAggregateType<T>>

    /**
     * Group by MilitaryRank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilitaryRankGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MilitaryRankGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MilitaryRankGroupByArgs['orderBy'] }
        : { orderBy?: MilitaryRankGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MilitaryRankGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilitaryRankGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MilitaryRank model
   */
  readonly fields: MilitaryRankFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MilitaryRank.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MilitaryRankClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MilitaryRank model
   */
  interface MilitaryRankFieldRefs {
    readonly id: FieldRef<"MilitaryRank", 'String'>
    readonly abbreviation: FieldRef<"MilitaryRank", 'String'>
    readonly order: FieldRef<"MilitaryRank", 'Int'>
    readonly createdAt: FieldRef<"MilitaryRank", 'DateTime'>
    readonly updatedAt: FieldRef<"MilitaryRank", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MilitaryRank findUnique
   */
  export type MilitaryRankFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * Filter, which MilitaryRank to fetch.
     */
    where: MilitaryRankWhereUniqueInput
  }

  /**
   * MilitaryRank findUniqueOrThrow
   */
  export type MilitaryRankFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * Filter, which MilitaryRank to fetch.
     */
    where: MilitaryRankWhereUniqueInput
  }

  /**
   * MilitaryRank findFirst
   */
  export type MilitaryRankFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * Filter, which MilitaryRank to fetch.
     */
    where?: MilitaryRankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MilitaryRanks to fetch.
     */
    orderBy?: MilitaryRankOrderByWithRelationInput | MilitaryRankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MilitaryRanks.
     */
    cursor?: MilitaryRankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MilitaryRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MilitaryRanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MilitaryRanks.
     */
    distinct?: MilitaryRankScalarFieldEnum | MilitaryRankScalarFieldEnum[]
  }

  /**
   * MilitaryRank findFirstOrThrow
   */
  export type MilitaryRankFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * Filter, which MilitaryRank to fetch.
     */
    where?: MilitaryRankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MilitaryRanks to fetch.
     */
    orderBy?: MilitaryRankOrderByWithRelationInput | MilitaryRankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MilitaryRanks.
     */
    cursor?: MilitaryRankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MilitaryRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MilitaryRanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MilitaryRanks.
     */
    distinct?: MilitaryRankScalarFieldEnum | MilitaryRankScalarFieldEnum[]
  }

  /**
   * MilitaryRank findMany
   */
  export type MilitaryRankFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * Filter, which MilitaryRanks to fetch.
     */
    where?: MilitaryRankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MilitaryRanks to fetch.
     */
    orderBy?: MilitaryRankOrderByWithRelationInput | MilitaryRankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MilitaryRanks.
     */
    cursor?: MilitaryRankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MilitaryRanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MilitaryRanks.
     */
    skip?: number
    distinct?: MilitaryRankScalarFieldEnum | MilitaryRankScalarFieldEnum[]
  }

  /**
   * MilitaryRank create
   */
  export type MilitaryRankCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * The data needed to create a MilitaryRank.
     */
    data: XOR<MilitaryRankCreateInput, MilitaryRankUncheckedCreateInput>
  }

  /**
   * MilitaryRank createMany
   */
  export type MilitaryRankCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MilitaryRanks.
     */
    data: MilitaryRankCreateManyInput | MilitaryRankCreateManyInput[]
  }

  /**
   * MilitaryRank update
   */
  export type MilitaryRankUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * The data needed to update a MilitaryRank.
     */
    data: XOR<MilitaryRankUpdateInput, MilitaryRankUncheckedUpdateInput>
    /**
     * Choose, which MilitaryRank to update.
     */
    where: MilitaryRankWhereUniqueInput
  }

  /**
   * MilitaryRank updateMany
   */
  export type MilitaryRankUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MilitaryRanks.
     */
    data: XOR<MilitaryRankUpdateManyMutationInput, MilitaryRankUncheckedUpdateManyInput>
    /**
     * Filter which MilitaryRanks to update
     */
    where?: MilitaryRankWhereInput
    /**
     * Limit how many MilitaryRanks to update.
     */
    limit?: number
  }

  /**
   * MilitaryRank upsert
   */
  export type MilitaryRankUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * The filter to search for the MilitaryRank to update in case it exists.
     */
    where: MilitaryRankWhereUniqueInput
    /**
     * In case the MilitaryRank found by the `where` argument doesn't exist, create a new MilitaryRank with this data.
     */
    create: XOR<MilitaryRankCreateInput, MilitaryRankUncheckedCreateInput>
    /**
     * In case the MilitaryRank was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MilitaryRankUpdateInput, MilitaryRankUncheckedUpdateInput>
  }

  /**
   * MilitaryRank delete
   */
  export type MilitaryRankDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
    /**
     * Filter which MilitaryRank to delete.
     */
    where: MilitaryRankWhereUniqueInput
  }

  /**
   * MilitaryRank deleteMany
   */
  export type MilitaryRankDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MilitaryRanks to delete
     */
    where?: MilitaryRankWhereInput
    /**
     * Limit how many MilitaryRanks to delete.
     */
    limit?: number
  }

  /**
   * MilitaryRank findRaw
   */
  export type MilitaryRankFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MilitaryRank aggregateRaw
   */
  export type MilitaryRankAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MilitaryRank without action
   */
  export type MilitaryRankDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MilitaryRank
     */
    select?: MilitaryRankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MilitaryRank
     */
    omit?: MilitaryRankOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const MilitaryRankScalarFieldEnum: {
    id: 'id',
    abbreviation: 'abbreviation',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MilitaryRankScalarFieldEnum = (typeof MilitaryRankScalarFieldEnum)[keyof typeof MilitaryRankScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MilitaryRankWhereInput = {
    AND?: MilitaryRankWhereInput | MilitaryRankWhereInput[]
    OR?: MilitaryRankWhereInput[]
    NOT?: MilitaryRankWhereInput | MilitaryRankWhereInput[]
    id?: StringFilter<"MilitaryRank"> | string
    abbreviation?: StringFilter<"MilitaryRank"> | string
    order?: IntFilter<"MilitaryRank"> | number
    createdAt?: DateTimeFilter<"MilitaryRank"> | Date | string
    updatedAt?: DateTimeFilter<"MilitaryRank"> | Date | string
  }

  export type MilitaryRankOrderByWithRelationInput = {
    id?: SortOrder
    abbreviation?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilitaryRankWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    abbreviation?: string
    order?: number
    AND?: MilitaryRankWhereInput | MilitaryRankWhereInput[]
    OR?: MilitaryRankWhereInput[]
    NOT?: MilitaryRankWhereInput | MilitaryRankWhereInput[]
    createdAt?: DateTimeFilter<"MilitaryRank"> | Date | string
    updatedAt?: DateTimeFilter<"MilitaryRank"> | Date | string
  }, "id" | "abbreviation" | "order">

  export type MilitaryRankOrderByWithAggregationInput = {
    id?: SortOrder
    abbreviation?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MilitaryRankCountOrderByAggregateInput
    _avg?: MilitaryRankAvgOrderByAggregateInput
    _max?: MilitaryRankMaxOrderByAggregateInput
    _min?: MilitaryRankMinOrderByAggregateInput
    _sum?: MilitaryRankSumOrderByAggregateInput
  }

  export type MilitaryRankScalarWhereWithAggregatesInput = {
    AND?: MilitaryRankScalarWhereWithAggregatesInput | MilitaryRankScalarWhereWithAggregatesInput[]
    OR?: MilitaryRankScalarWhereWithAggregatesInput[]
    NOT?: MilitaryRankScalarWhereWithAggregatesInput | MilitaryRankScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MilitaryRank"> | string
    abbreviation?: StringWithAggregatesFilter<"MilitaryRank"> | string
    order?: IntWithAggregatesFilter<"MilitaryRank"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MilitaryRank"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MilitaryRank"> | Date | string
  }

  export type MilitaryRankCreateInput = {
    id?: string
    abbreviation: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilitaryRankUncheckedCreateInput = {
    id?: string
    abbreviation: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilitaryRankUpdateInput = {
    abbreviation?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilitaryRankUncheckedUpdateInput = {
    abbreviation?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilitaryRankCreateManyInput = {
    id?: string
    abbreviation: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilitaryRankUpdateManyMutationInput = {
    abbreviation?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilitaryRankUncheckedUpdateManyInput = {
    abbreviation?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MilitaryRankCountOrderByAggregateInput = {
    id?: SortOrder
    abbreviation?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilitaryRankAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MilitaryRankMaxOrderByAggregateInput = {
    id?: SortOrder
    abbreviation?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilitaryRankMinOrderByAggregateInput = {
    id?: SortOrder
    abbreviation?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilitaryRankSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}