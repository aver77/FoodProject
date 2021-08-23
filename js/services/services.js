const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        //body: formData
        body: data
    });
    return await res.json(); //трансформация ответа в json
};

const getResource = async (url) => {
    const res = await fetch(url);

    //тк catch для fetch не отлавливает ошибку при неправильном запросе
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); //выкидываем ошибку вручную
    }

    return await res.json(); //трансформация ответа в json
};

export {postData};
export {getResource};