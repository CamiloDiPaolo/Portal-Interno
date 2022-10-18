import { writeFileSync, unlinkSync } from 'fs';
import { json } from '@sveltejs/kit';
import { createImage, deleteImage, getImage } from '$lib/server/db/db';

export async function POST({ request }) {
	const data = await request.json();
	console.log(data);

	const file = data.image;

	const path = `img/${data.path}/${new Date().getTime()}.png`;

	writeFileSync(`static/${path}`, file, 'base64');

	data.url = path;
	try {
		const newImage = await createImage({ url: data.url, alt: data.alt });

		return json({
			status: '201',
			newImage
		});
	} catch (err) {
		throw err;
	}
}

export async function DELETE({ request }) {
	const data = await request.json();
	const img = await getImage({ _id: data.id });

	unlinkSync(`static/${img.url}`);
	await deleteImage(data.id);

	return json({
		status: '202'
	});
}
