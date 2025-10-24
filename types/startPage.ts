import { TBlock } from "./block";

export type TStartPage = {
	id: number;
	createdAt: string;
	start_page_sub_title: string;
	start_page_title: string;
	updated_at: string;
	data: TStartPageData;
};

export type TStartPageData = {
	createdAt: string;
	updatedAt: string;
	startPagePosts?: TBlock[];
	startPageTitle?: string;
	startPageSubTitle?: string;
};
