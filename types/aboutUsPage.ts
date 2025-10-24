import { TBlock } from "./block";

export type TAboutUs = {
	id: number;
	createdAt: string;
	about_us_sub_title: string;
	about_us_title: string;
	updated_at: string;
	data: TAboutUsData;
};

export type TAboutUsData = {
	createdAt: string;
	updatedAt: string;
	aboutUsPosts?: TBlock[];
	aboutUsTitle?: string;
	aboutUsSubTitle?: string;
};
