export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }
    return (
        <div>
            <img src="img/unnamed.png" />
            <h1>Hello World</h1>
            <p>Razer4you</p>
            <GreetingBinjai/>
            <QuoteText/>
            <UserCard
            nama="dta"
            nim = "2457301001"
            tanggal = "2026-09-02"
            />

        <UserCard
            nama="razer"
            nim = "1234"
            tanggal = "2026-09-02"
            />

            <UserCard{...propsUserCard}/>
        </div>
    )
}
function QuoteText(){
     const text = "CALLMERAZER";
    const text2 = "IZINNNNNNNNNBOSKUU";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function GreetingBinjai(){
    return(
        <small>Salam dari binjai</small>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}