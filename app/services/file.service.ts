export const FileService = {
	async upload(file: any, folder?: string) {
		let url = 'http://localhost:3000/api/files'

		folder?.length
			? (url = `http://localhost:3000/api/files?folder=${folder}`)
			: url

		const response = await fetch(url, {
			method: 'POST',
			body: file,
		})
		file = await response.json()

		return file[0].url
	},
}
