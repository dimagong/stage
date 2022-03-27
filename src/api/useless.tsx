import axios from "axios"

const useless = async (): Promise<any> => {
	const resp = await axios.get("https://uselessfacts.jsph.pl/random.json")
	return resp.data
}

export default useless
