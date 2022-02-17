import axios from "axios"

const useless = async (): Promise<any> => {
	try {
		const resp = await axios.get("https://uselessfacts.jsph.pl/random.json")
		return resp.data
	} catch (error) {
		return error as Error
	}
}

export default useless
