export const sendJSON = () => {
    let data = {
        name: 'peter',
        secondName: 'weiss'
    }
    // console.log(JSON.stringify(data))
    fetch('/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => { return res.text() })
        .then(response => console.log('bim! ', response))
        .catch(error => console.log('Snap! ', error))

}
