import { TBlock } from "./block";

export type TInfo = {
	id: number;
	createdAt: string;
	info_sub_title: string;
	info_title: string;
	updated_at: string;
	data: TInfoData;
};

export type TInfoData = {
	createdAt: string;
	updatedAt: string;
	infoPosts?: TBlock[];
	infoTitle?: string;
	infoSubTitle?: string;
};
