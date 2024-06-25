import React from 'react'

const useFetch = () => {
  const [data, setData] = React.useState(null)
  const [erro, setErro] = React.useState(null)

  const request = React.useCallback(async (url) => {
    let response;
    try {
      response = await (await fetch(url)).json()
      setData(response);
      if (!response.ok) throw new Error(response.message)
    }
    catch (err: any) {
      response = null;
      setErro(err.message)
    }
  }, [])

  return {
    data, erro, request
  }
}

export default useFetch;