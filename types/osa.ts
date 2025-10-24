import { TBlock } from "./block";

export type TOsa = {
	id: number;
	createdAt: string;
	osa_sub_title: string;
	osa_title: string;
	updated_at: string;
	data: TOsaData;
};

export type TOsaData = {
	createdAt: string;
	updatedAt: string;
	OsaPosts?: TBlock[];
	OsaTitle?: string;
	OsaSubTitle?: string;
};
