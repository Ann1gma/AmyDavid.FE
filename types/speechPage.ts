import { TBlock } from "./block";

export type TSpeech = {
	id: number;
	createdAt: string;
	speech_sub_title: string;
	speech_title: string;
	updated_at: string;
	data: TSpeechData;
};

export type TSpeechData = {
	createdAt: string;
	updatedAt: string;
	SpeechPosts?: TBlock[];
	SpeechTitle?: string;
	SpeechSubTitle?: string;
};
