"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useModalStore } from "@/store";
import { useRouter } from "next/navigation";

export type TGuest = {
	id: number;
	name: string | null;
	surname: string | null;
	emailadress?: string | null;
	food?: string | null;
	other?: string | null;
};

type FormValues = {
	guests: TGuest[];
};

const OsaForm = () => {
	const { showModal, hideModal } = useModalStore();
	const router = useRouter();
	const [numOfGuests, setNumOfGuests] = useState(1);
	const [guestsInfo, setGuestsInfo] = useState<TGuest[]>([
		{
			id: numOfGuests,
			name: null,
			surname: null,
			emailadress: null,
			food: null,
			other: null,
		},
	]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			guests: [guestsInfo[0]],
		},
	});

	const closeModal = () => {
		hideModal();
		router.push("/");
	};

	const submitHandler: SubmitHandler<FormValues> = async (data) => {
		try {
			const res = await fetch("/api/send-osa", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Misslyckades att skicka mejl");

			setGuestsInfo([
				{
					id: numOfGuests,
					name: null,
					surname: null,
					emailadress: null,
					food: null,
					other: null,
				},
			]);

			showModal(
				<div className="flex flex-col items-center">
					<h2>Tack för din anmälan</h2>
					<button
						className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl "
						onClick={closeModal}
					>
						Stäng
					</button>
				</div>
			);
		} catch (error) {
			alert("Något gick fel, försök igen.");
			console.error(error);
		}
	};

	const handleNumOfGuest = (change: number) => {
		if (numOfGuests === 1 && change === -1) {
			return;
		} else if (numOfGuests === 6 && change === 1) {
			return;
		}

		if (change === 1) {
			setNumOfGuests(numOfGuests + 1);
			setGuestsInfo((prev) => [
				...prev,
				{
					id: numOfGuests + 1,
					name: null,
					surname: null,
					emailadress: null,
					food: null,
					other: null,
				},
			]);
		} else if (change === -1) {
			setNumOfGuests(numOfGuests - 1);
			setGuestsInfo((prevItems) => prevItems.slice(0, -1));
		}
	};

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col items-center">
				<h2>Anmälningsformulär</h2>
				<>
					<p className="mt-8 text-base">Hur många är ni som kommer?</p>
					<div className="flex flex-row items-center gap-8 mt-4">
						<button
							onClick={() => handleNumOfGuest(-1)}
							className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl"
						>
							<FontAwesomeIcon
								icon={faChevronDown}
								style={{ color: "#3f3f3f" }}
							/>
						</button>
						<p>{numOfGuests}</p>

						<button
							onClick={() => handleNumOfGuest(+1)}
							className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl "
						>
							<FontAwesomeIcon
								icon={faChevronUp}
								style={{ color: "#3f3f3f" }}
							/>
						</button>
					</div>
				</>
			</div>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="flex flex-col gap-8 mb-20 items-center justify-items-center w-[90%] md:w-full max-w-3xl mx-auto"
			>
				{guestsInfo.map((guest, index) => (
					<div
						key={guest.id}
						className="border rounded-xl p-4 space-y-2 w-full"
					>
						<h3 className="font-semibold text-lg">Gäst {guest.id}</h3>

						<div>
							<label className="block font-medium">Förnamn *</label>
							<input
								{...register(`guests.${index}.name`, {
									required: "Förnamn är obligatoriskt",
								})}
								className="border rounded p-2 w-full"
							/>
							{errors.guests?.[index]?.name && (
								<p className="text-red-500 text-sm">
									{errors.guests[index]?.name?.message}
								</p>
							)}
						</div>

						<div>
							<label className="block font-medium">Efternamn *</label>
							<input
								{...register(`guests.${index}.surname`, {
									required: "Efternamn är obligatoriskt",
								})}
								className="border rounded p-2 w-full"
							/>
							{errors.guests?.[index]?.surname && (
								<p className="text-red-500 text-sm">
									{errors.guests[index]?.surname?.message}
								</p>
							)}
						</div>

						<div>
							<label className="block font-medium">E-postadress</label>
							<input
								{...register(`guests.${index}.emailadress`, {
									pattern: {
										value: /^\S+@\S+\.\S+$/,
										message: "Ogiltig e-postadress",
									},
								})}
								className="border rounded p-2 w-full"
							/>
							{errors.guests?.[index]?.emailadress && (
								<p className="text-red-500 text-sm">
									{errors.guests[index]?.emailadress?.message}
								</p>
							)}
						</div>

						<div>
							<label className="block font-medium">Kost/allergier</label>
							<input
								{...register(`guests.${index}.food`)}
								className="border rounded p-2 w-full"
							/>
						</div>

						<div>
							<label className="block font-medium">Övrigt</label>
							<input
								{...register(`guests.${index}.other`)}
								className="border rounded p-2 w-full"
							/>
						</div>
					</div>
				))}
				<div>
					<button className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl">
						<p className="font-semibold">Skicka in anmälan</p>
					</button>
				</div>
			</form>
		</div>
	);
};

export default OsaForm;
