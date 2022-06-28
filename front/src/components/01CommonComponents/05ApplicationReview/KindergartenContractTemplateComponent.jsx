import React from "react";

export default function KindergartenContractTemplateComponent(props) {

    return (
        <div className="container pt-4" >
            <div className="container pb-2">
                <h6>Sutartis peržiūrai:</h6>
            </div>

            <div className="container pb-2">
                <p>IKIMOKYKLINIO UGDYMO PASLAUGŲ SUTARTIS</p>
                <p>Nr. {this.state.id}</p>
                <p>({response.data.approvalDate});</p>
                <p>Ikimokyklinio ugdymo paslaugų sutartis sudaroma tarp darželio  {props.state.approvedKindergarten}, kurį atstovauja _________________________________,&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (Darželio pavadinimas) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (Darželio direktorius)&nbsp;</p>
                <p>veikiančio pagal Darželio nuostatus ir Tėvų/Globėjų (toliau - Tėvai), atstovaujančių vaiko interesus. &nbsp;</p>
                <p> {props.state.mainGuardian.name} {props.state.mainGuardian.surname} &nbsp; &nbsp; {props.state.additionalGuardian.name} {props.state.additionalGuardian.surname} &nbsp;</p>
                <p> {props.state.additionalGuardian.phone} &nbsp; &nbsp; {props.state.additionalGuardian.phone} &nbsp;</p>
                <p> {props.state.additionalGuardian.email} &nbsp; &nbsp; {props.state.additionalGuardian.email} &nbsp;</p>
                <p> {props.state.additionalGuardian.address} &nbsp; &nbsp; {props.state.additionalGuardian.address} &nbsp;</p>
                <p>&nbsp;(Sutartį pasira&scaron;ius vienam i&scaron; Tėvų, kitas i&scaron; Tėvų neatleidžiamas nuo &scaron;ios sutarties įsipareigojimų vykdymo).&nbsp;</p>
                <p>&nbsp;</p>
            </div>

            <div className="container pb-2">
                <p>I. SUTARTIES OBJEKTAS&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;Ikimokyklinio ugdymo paslaugų sutartimi (toliau &ndash; Sutartis) Darželis įsipareigoja teikti &nbsp;ugdymo paslaugas, kurių gavėjas {props.state.childName} {props.state.childSurname} toliau &ndash; Ugdytinis,&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(vaiko vardas, pavardė)&nbsp;</p>
                <p>o Tėvai įsipareigoja apmokėti už &scaron;ias paslaugas bei vykdyti visus įsipareigojimus, prisiimtus Sutartimi.&nbsp;</p>
                <p>&nbsp;Ugdymo paslaugos apima sisteminį neformalaus ugdymų plano(-ų), ugdymo programos(-ų) sudarymą ir įgyvendinimą atitinkamoms amžiaus grupėms pagal LR &Scaron;vietimo ir mokslo ministerijos bei Klaipėdos rajono savivaldybės (toliau &ndash; Savivaldybė) patvirtintas programas, rekomendacijas, tvarkos apra&scaron;us ir kitus norminius teisės aktus. &nbsp;</p>
                <p>&nbsp;</p>
            </div>

            <div className="container pb-2">
                <p>II. SUTARTIES &Scaron;ALIŲ ĮSIPAREIGOJIMAI&nbsp;</p>
                <p>&nbsp;</p>
                <p>1. Darželis įsipareigoja:&nbsp;</p>
                <p>1.1. įgyvendinti ikimokyklinio ugdymo programą.&nbsp;</p>
                <p>1.2. užtikrinti, kad suteiktos paslaugos atitiktų galiojančius teisės aktus;&nbsp;</p>
                <p>1.3. užtikrinti, kad paslaugos atitiktų ugdytinio poreikius, individualizuoti ir diferencijuoti &nbsp;</p>
                <p>ugdymo turinį, skiriant visoms vaiko raidos sritims &ndash; sveikatos, socialinei, kalbos, pažinimo, meninei &ndash; vienodą dėmesį, &nbsp;pritaikyti jį specialiųjų poreikių vaikams;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;1.4. teikti pedagoginę, specialiąją pedagoginę pagalbą, kineziterapeuto, masažuotojo, regos korekcijos specialisto paslaugas, bendrauti ir bendradarbiauti su specialiųjų poreikių vaikų individualios korekcinės pagalbos institucijomis;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;1.5. organizuoti medicininę pagalbą Ugdytiniui nelaimės atveju. Ugdytiniui susirgus ar susižeidus &nbsp;informuoti Tėvus;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;1.6. organizuoti papildomo ugdymo veiklą atsižvelgiant į vaiko poreikius ir įstaigos galimybes;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;* Už papildomos, &Scaron;vietimo įstatymu nereglamentuotos, bet Tėvų pageidavimu vykdomos mokamos veiklos (būrelių, užsiėmimų, studijų ir kt.) kokybę Darželis neatsako.&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;1.7. ugdymosi pasiekimus vertinti objektyviai ir ne&scaron;ali&scaron;kai, vadovaujantis individualios pažangos principu;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;1.8. teikti informaciją apie Ugdytinio pasiekimus, elgesį Tėvams ir saugoti &scaron;ios informacijos konfidencialumą. &nbsp; &nbsp; &nbsp; &nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;1.9. bendradarbiauti su Tėvais sprendžiant ugdymo proceso organizavimo, vaikų ugdymo(si) klausimus, inicijuoti Tėvų dalyvavimą Darželio savivaldoje;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;1.10. tvarkyti Ugdytinio asmens duomenis vadovaujantis Asmens duomenų teisinės apsaugos įstatymu.&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;2. Darželis turi teisę:&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;2.1. savo nuožiūra kurti ir taikyti pedagoginės veiklos programas, metodus ir formas;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;2.2. Sutartyje nustatytomis sąlygomis ir tvarka atsisakyti teikti ikimokyklinio ugdymo paslaugas ir nutraukti &scaron;ią sutartį savo iniciatyva;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;2.3. konsultuotis ir informuoti apie rimtą Sutarties pažeidimą, atitinkamas institucijas (Vaiko teisių apsaugos skyrių, Klaipėdos rajono pedagoginę psichologinę tarnybą ir pan.);&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;2.4. reikalauti, kad Tėvai imtųsi konkrečių priemonių dėl netinkamo Ugdytinio elgesio;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;2.5. fotografuoti, filmuoti Ugdytinį darželio &scaron;venčių, ekskursijų ir kitų ugdymo tikslais organizuojamų renginių metu.&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3. Tėvai įsipareigoja:&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.1. ugdyti vaiko pagarbą mokytojams, bendraamžiams bei Darželio bendruomenės nariams;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.2. leisti patikrinti vaiko sveikatą, bei asmens higieną Darželio sveikatos priežiūros specialistams ir pedagogams, siekiant užkirsti kelią pedikuliozei ir kitų užkrečiamųjų ligų plitimui;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.3. leisti kineziterapeutui atlikti skeleto ir raumenų būklės tyrimą, siekiant pagerinti biomechaninių padėčių vystymąsi;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.4. &nbsp;leisti regos korekcijos specialistui, esant poreikiui, įvertinti regos a&scaron;trumą, siekiant gerinti vaikų regėjimą;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.5. gavę prane&scaron;imą apie skirtą vietą Įstaigoje, per 10 kalendorinių dienų turi kreiptis į Įstaigą, patvirtinti vaiko atvykimą ir pateikti visus reikalingus dokumentus (vaiko gimimo liudijimo kopiją, elektroninį sveikatos pažymėjimą ir vėliau kiekvienais metais (forma Nr. E027-1) bei pažymą, patvirtinančią, kad deklaracijoje gyvenamoji vieta nurodyta Klaipėdos rajono savivaldybė;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.6. pasiimti Ugdytinį i&scaron; Darželio per 2 valandas po to, kai Tėvams buvo prane&scaron;ta apie įtariamą Ugdytinio ligą ar susižeidimą;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.7. pirmą Ugdytinio neatvykimo dieną informuoti telefonu ar atvykus apie Ugdytinio ligą (pedikuliozę) ar kitą Darželio nelankymo priežastį iki 8.15 val. ryto grupės arba bendruoju telefonu;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.8. ligos atveju nevesti Ugdytinio į Darželį;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.9. informuoti &nbsp;apie bet kokius specialius Ugdytinio poreikius (ugdymosi, maisto, alergijos ir pan.);&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.10. atlyginti Ugdytino padarytą materialinę žalą Darželiui ar kitiems asmenims, kurią vaikas padaro būdamas Darželyje;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.11. atvesti Ugdytinį į Darželį &scaron;varų, aprengtą tvarkingais, &scaron;variais drabužiais, esant tinkamoms oro sąlygoms, neprie&scaron;tarauti jo i&scaron;vedimui į lauką, pasirūpinti atsarginiais drabužiais vaikui perrengti;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.12. laiku, nustatyta tvarka ir terminais sumokėti Savivaldybės nustatyto dydžio mokestį už teikiamas paslaugas;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.13. laiku, numatyta tvarka ir terminais, sumokėti už Tėvų pageidavimu Ugdytiniui teikiamas papildomas paslaugas Darželyje;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.14. Ugdytinį privalo atlydėti į Darželį ir pasiimti i&scaron; Darželio suaugę asmenys. &nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;3.15. neleisti Ugdytiniui ne&scaron;tis į Darželį vertingų ir pavojingų daiktų ( mobiliųjų telefonų, fotoaparatų, elektroninių žaidimų, pinigų, a&scaron;trių daiktų, vaistų ir pan.) bei maisto produktų, galinčių sukelti pavojų vaikų sveikatai ir saugumui (saldumynų su kremu ar &scaron;okoladu, gėrimų su dažikliais, konservantais, saldikliais, bulvių tra&scaron;kučių ir pan.);&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; 3.16. sutikti, kad Ugdytinio asmens ir kiti teisės aktuose nustatyti duomenys bus tvarkomi teisės aktuose nustatytuose registruose;&nbsp;</p>
                <p>&nbsp;3.17. aprūpinti Ugdytinį individualiomis higienos ir ugdymosi priemonėmis. &nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;4. Tėvai turi teisę:&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;4.1. žinoti vaiko ugdymosi rezultatus, i&scaron;kylančias socializacijos, psichologines ar pedagogines problemas;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 4.2. parinkti papildomo ugdymo veiklą (ekskursijas, i&scaron;vykas ir kitus papildomus edukacinius renginius) pagal vaiko poreikius ir Darželio galimybes.&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;4.3. teikti siūlymus dėl ugdymo darbo organizavimo, ugdymo kokybės gerinimo, dalyvauti Tėvams skirtuose renginiuose, susirinkimuose, savivaldoje.&nbsp;</p>
                <p>&nbsp;</p>
            </div>

            <div className="container pb-2">
                <p>III. SUTARTIES ĮSIGALIOJIMAS, GALIOJIMAS, KEITIMAS IR NUTRAUKIMAS&nbsp;</p>
                <p>&nbsp; &nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;5. Sutartis įsigalioja nuo jos pasira&scaron;ymo dienos ir galioja iki Ugdytinis baigs ikimokyklinio ugdymo programą.&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;6. Sutartis gali būti nutraukta:&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;6.1. &scaron;alių susitarimu;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;6.2. Tėvams viena&scaron;ali&scaron;kai parei&scaron;kus apie Sutarties nutraukimą prie&scaron; 10 darbo dienų;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;6.3. Darželis viena&scaron;ali&scaron;kai gali nutraukti Sutartį:&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;6.3.1 kai Ugdytinio elgesys kelia realią ir akivaizdžią grėsmę Darželio vaikų arba Darželio darbuotojų saugumui;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; 6.3.2. Tėvai nuolat pažeidinėja Sutarties 3.14 punkto reikalavimą &nbsp;laiku atvesti ir pasiimti ugdytinį;&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; 6.3.3. Tėvai vėluoja atsiskaityti už teikiamas paslaugas 2 mėnesius. Sutarties nutraukimas neatleidžia nuo prievolės sumokėti už suteiktas paslaugas.&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; 7. Visi Sutarties pakeitimai, priedai ir papildymai &nbsp;sudaromi tik ra&scaron;tu, Sutartis turi būti registruota teisės aktų nustatyta tvarka.&nbsp;</p>
                <p>&nbsp;</p>
            </div>

            <div className="container pb-2">
                <p>IV. GINČŲ SPRENDIMAS&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; 8. Ginčytini ugdymo proceso organizavimo, Darželio veiklos, sutarties pažeidimo klausimai sprendžiami &scaron;alims geranori&scaron;kai bendradarbiaujant. Ginčytini klausimai pirmiausiai aptariami su grupės mokytoju, direktoriaus pavaduotoju ugdymui, kitais specialistais. Neradus sprendimo, kreipiamasi į Darželio direktorių.&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp;9. Tėvų pra&scaron;ymus dėl ginčų objektyvumo nagrinėja direktoriaus įsakymu sudaryta komisija, kurią sudaro administracijos, pedagogų ir ugdytinio atstovai.&nbsp;</p>
            </div>


            <div className="container pb-2"><p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>Sutarties &scaron;alių para&scaron;ai:&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>Ugdymo įstaigos atstovas &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; __________________________&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (para&scaron;as) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (vardas, pavardė)&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>Tėvas/Globėjas &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {props.state.mainGuardian.name} {props.state.mainGuardian.surname} </p>
            </div>
        </div >
    )
}