import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

import { FileService } from '@/services/file.service'

import { toastError } from '@/utils/toast-error'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true)
		const files = e.target.files

		if (files?.length) {
			const formData = new FormData()

			formData.append('file', files[0])

			const data = await FileService.upload(formData, folder)

			onChange(data)
			setIsLoading(false)
		}
	}

	return useMemo(() => ({ uploadFile, isLoading }), [uploadFile, isLoading])
}
