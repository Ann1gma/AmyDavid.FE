import { TBlock } from "@/types/block";
import Image from "next/image";
import NavButton from "./NavButton";

const Block = ({ postData }: { postData: TBlock[] }) => {
	return (
		<>
			{postData.map((post, index) => (
				<div key={index} className="mb-20">
					{post.blockTitle && <h3>{post.blockTitle}</h3>}
					{post.blockSubtitle && <h4>{post.blockSubtitle}</h4>}
					{post.blockText && <p>{post.blockText}</p>}
					<div className="items-center justify-items-center">
						{post.blockImageUrl && (
							<Image
								src={post.blockImageUrl}
								alt={post.blockText || ""}
								width={500}
								height={500}
							/>
						)}
					</div>
					<div className="flex justify-center my-10">
						{post.linkBtn && post.linkBtnText && (
							<NavButton text={post.linkBtnText} url={post.linkBtn} />
						)}
					</div>
				</div>
			))}
		</>
	);
};

export default Block;
