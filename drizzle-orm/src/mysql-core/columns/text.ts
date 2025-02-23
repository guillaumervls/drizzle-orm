import type { ColumnBuilderBaseConfig, ColumnBuilderRuntimeConfig, MakeColumnConfig } from '~/column-builder.ts';
import type { ColumnBaseConfig } from '~/column.ts';
import { entityKind } from '~/entity.ts';
import type { AnyMySqlTable } from '~/mysql-core/table.ts';
import { getColumnNameAndConfig, type Writable } from '~/utils.ts';
import { MySqlColumn, MySqlColumnBuilder } from './common.ts';

export type MySqlTextColumnType = 'tinytext' | 'text' | 'mediumtext' | 'longtext';

export type MySqlTextBuilderInitial<TName extends string, TEnum extends [string, ...string[]]> = MySqlTextBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'MySqlText';
	data: TEnum[number];
	driverParam: string;
	enumValues: TEnum;
}>;

export class MySqlTextBuilder<T extends ColumnBuilderBaseConfig<'string', 'MySqlText'>> extends MySqlColumnBuilder<
	T,
	{ textType: MySqlTextColumnType; enumValues: T['enumValues'] }
> {
	static override readonly [entityKind]: string = 'MySqlTextBuilder';

	constructor(name: T['name'], textType: MySqlTextColumnType, config: MySqlTextConfig<T['enumValues']>) {
		super(name, 'string', 'MySqlText');
		this.config.textType = textType;
		this.config.enumValues = config.enum;
	}

	/** @internal */
	override build<TTableName extends string>(
		table: AnyMySqlTable<{ name: TTableName }>,
	): MySqlText<MakeColumnConfig<T, TTableName>> {
		return new MySqlText<MakeColumnConfig<T, TTableName>>(table, this.config as ColumnBuilderRuntimeConfig<any, any>);
	}
}

export class MySqlText<T extends ColumnBaseConfig<'string', 'MySqlText'>>
	extends MySqlColumn<T, { textType: MySqlTextColumnType; enumValues: T['enumValues'] }>
{
	static override readonly [entityKind]: string = 'MySqlText';

	readonly textType: MySqlTextColumnType = this.config.textType;

	override readonly enumValues = this.config.enumValues;

	getSQLType(): string {
		return this.textType;
	}
}

export interface MySqlTextConfig<
	TEnum extends readonly string[] | string[] | undefined = readonly string[] | string[] | undefined,
> {
	enum?: TEnum;
}

export function text(): MySqlTextBuilderInitial<'', [string, ...string[]]>;
export function text<U extends string, T extends Readonly<[U, ...U[]]>>(
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<'', Writable<T>>;
export function text<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(
	name: TName,
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<TName, Writable<T>>;
export function text(a?: string | MySqlTextConfig, b: MySqlTextConfig = {}): any {
	const { name, config } = getColumnNameAndConfig<MySqlTextConfig>(a, b);
	return new MySqlTextBuilder(name, 'text', config as any);
}

export function tinytext(): MySqlTextBuilderInitial<'', [string, ...string[]]>;
export function tinytext<U extends string, T extends Readonly<[U, ...U[]]>>(
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<'', Writable<T>>;
export function tinytext<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(
	name: TName,
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<TName, Writable<T>>;
export function tinytext(a?: string | MySqlTextConfig, b: MySqlTextConfig = {}): any {
	const { name, config } = getColumnNameAndConfig<MySqlTextConfig>(a, b);
	return new MySqlTextBuilder(name, 'tinytext', config as any);
}

export function mediumtext(): MySqlTextBuilderInitial<'', [string, ...string[]]>;
export function mediumtext<U extends string, T extends Readonly<[U, ...U[]]>>(
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<'', Writable<T>>;
export function mediumtext<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(
	name: TName,
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<TName, Writable<T>>;
export function mediumtext(a?: string | MySqlTextConfig, b: MySqlTextConfig = {}): any {
	const { name, config } = getColumnNameAndConfig<MySqlTextConfig>(a, b);
	return new MySqlTextBuilder(name, 'mediumtext', config as any);
}

export function longtext(): MySqlTextBuilderInitial<'', [string, ...string[]]>;
export function longtext<U extends string, T extends Readonly<[U, ...U[]]>>(
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<'', Writable<T>>;
export function longtext<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(
	name: TName,
	config?: MySqlTextConfig<T | Writable<T>>,
): MySqlTextBuilderInitial<TName, Writable<T>>;
export function longtext(a?: string | MySqlTextConfig, b: MySqlTextConfig = {}): any {
	const { name, config } = getColumnNameAndConfig<MySqlTextConfig>(a, b);
	return new MySqlTextBuilder(name, 'longtext', config as any);
}
