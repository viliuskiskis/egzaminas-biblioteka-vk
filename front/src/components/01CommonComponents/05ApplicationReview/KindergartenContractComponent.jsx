import React from "react";

export default function KindergartenContractComponent(props) {

  return (
    <div className="container pt-4">

      <div className="container pb-2">
        <p><i>{'//'} Sutarties tekstas peržiūrai {'//'}</i></p>
        <p></p>
        <h4>IKIMOKYKLINIO UGDYMO PASLAUGŲ SUTARTIS</h4>
        <p>Nr.{props.state.id} </p>
        <p>Data: {props.state.approvalDate}</p>

        <p>Ikimokyklinio ugdymo paslaugų sutartis sudaroma tarp darželio  <b>{props.state.approvedKindergarten}</b>, kurį atstovauja <b>{props.state.approvedKindergartenManager}, </b></p>
        <p>veikiančio pagal Darželio nuostatus, ir Tėvų/Globėjų (toliau - Tėvai)*, atstovaujančių vaiko interesus.</p>

        <p>
          <span><b>{props.state.mainGuardianName} {props.state.mainGuardianSurname}</b>, </span>
          <span>tel. nr.: <b>{props.state.mainGuardianPhone}</b>, </span>
          <span>e-paštas: <b>{props.state.mainGuardianEmail}</b>, </span>
          <span>adresas: <b>{props.state.mainGuardianAddress}</b></span>
        </p>
        {props.state.additionalGuardianName &&
          <p>
            <span><b>{props.state.additionalGuardianName} {props.state.additionalGuardianSurname}</b>, </span>
            <span>tel. nr.: <b>{props.state.additionalGuardianPhone}</b>, </span>
            <span>e-paštas: <b>{props.state.additionalGuardianEmail}</b>, </span>
            <span>adresas: <b>{props.state.additionalGuardianAddress}</b></span>
          </p>
        }
        <p><sub>*(Sutartį pasira&scaron;ius vienam i&scaron; Tėvų, kitas i&scaron; Tėvų neatleidžiamas nuo &scaron;ios sutarties įsipareigojimų vykdymo).</sub></p>
      </div >

      <div className="container pb-2">
        <h6>I. SUTARTIES OBJEKTAS</h6>
        <p>Ikimokyklinio ugdymo paslaugų sutartimi (toliau &ndash; Sutartis) Darželis įsipareigoja teikti ugdymo paslaugas, kurių gavėjas <b> {props.state.childName} {props.state.childSurname}</b>, toliau &ndash; Ugdytinis, o Tėvai įsipareigoja apmokėti už &scaron;ias paslaugas bei vykdyti visus įsipareigojimus, prisiimtus Sutartimi.</p>
        <p>Ugdymo paslaugos apima sisteminį neformalaus ugdymų plano(-ų), ugdymo programos(-ų) sudarymą ir įgyvendinimą atitinkamoms amžiaus grupėms pagal LR &Scaron;vietimo ir mokslo ministerijos bei Klaipėdos rajono savivaldybės (toliau &ndash; Savivaldybė) patvirtintas programas, rekomendacijas, tvarkos apra&scaron;us ir kitus norminius teisės aktus.</p>
      </div>

      <div className="container pb-2">
        <h6>II. SUTARTIES &Scaron;ALIŲ ĮSIPAREIGOJIMAI</h6>
        <p>1. Darželis įsipareigoja:</p>
        <div>
          <p>1.1. įgyvendinti ikimokyklinio ugdymo programą;</p>
          <p>1.2. užtikrinti, kad suteiktos paslaugos atitiktų galiojančius teisės aktus;</p>
          <p>1.3. užtikrinti, kad paslaugos atitiktų ugdytinio poreikius, individualizuoti ir diferencijuoti ugdymo turinį, skiriant visoms vaiko raidos sritims: sveikatos, socialinei, kalbos, pažinimo, meninei &ndash; vienodą dėmesį, pritaikyti jį specialiųjų poreikių vaikams;</p>
          <p>1.4. teikti pedagoginę, specialiąją pedagoginę pagalbą, kineziterapeuto, masažuotojo, regos korekcijos specialisto paslaugas, bendrauti ir bendradarbiauti su specialiųjų poreikių vaikų individualios korekcinės pagalbos institucijomis;</p>
          <p>1.5. organizuoti medicininę pagalbą Ugdytiniui nelaimės atveju. Ugdytiniui susirgus ar susižeidus informuoti Tėvus;</p>
          <p>1.6. organizuoti papildomo ugdymo veiklą atsižvelgiant į vaiko poreikius ir įstaigos galimybes*;</p>
          <p><sub>* Už papildomos, &Scaron;vietimo įstatymu nereglamentuotos, bet Tėvų pageidavimu vykdomos mokamos veiklos (būrelių, užsiėmimų, studijų ir kt.) kokybę Darželis neatsako.)</sub></p>
          <p>1.7. ugdymosi pasiekimus vertinti objektyviai ir ne&scaron;ali&scaron;kai, vadovaujantis individualios pažangos principu;</p>
          <p>1.8. teikti informaciją apie Ugdytinio pasiekimus, elgesį Tėvams ir saugoti &scaron;ios informacijos konfidencialumą.</p>
          <p>1.9. bendradarbiauti su Tėvais sprendžiant ugdymo proceso organizavimo, vaikų ugdymo(si) klausimus, inicijuoti Tėvų dalyvavimą Darželio savivaldoje;</p>
          <p>1.10. tvarkyti Ugdytinio asmens duomenis vadovaujantis Asmens duomenų teisinės apsaugos įstatymu.</p></div>
        <p>2. Darželis turi teisę:</p>
        <div>
          <p>2.1. savo nuožiūra kurti ir taikyti pedagoginės veiklos programas, metodus ir formas;</p>
          <p>2.2. Sutartyje nustatytomis sąlygomis ir tvarka atsisakyti teikti ikimokyklinio ugdymo paslaugas ir nutraukti &scaron;ią sutartį savo iniciatyva;</p>
          <p>2.3. konsultuotis ir informuoti apie rimtą Sutarties pažeidimą, atitinkamas institucijas (Vaiko teisių apsaugos skyrių, Klaipėdos rajono pedagoginę psichologinę tarnybą ir pan.);</p>
          <p>2.4. reikalauti, kad Tėvai imtųsi konkrečių priemonių dėl netinkamo Ugdytinio elgesio;</p>
          <p>2.5. fotografuoti, filmuoti Ugdytinį darželio &scaron;venčių, ekskursijų ir kitų ugdymo tikslais organizuojamų renginių metu.</p>
        </div>
        <p>3. Tėvai įsipareigoja:</p>
        <div>
          <p>3.1. ugdyti vaiko pagarbą mokytojams, bendraamžiams bei Darželio bendruomenės nariams;</p>
          <p>3.2. leisti patikrinti vaiko sveikatą, bei asmens higieną Darželio sveikatos priežiūros specialistams ir pedagogams, siekiant užkirsti kelią pedikuliozei ir kitų užkrečiamųjų ligų plitimui;</p>
          <p>3.3. leisti kineziterapeutui atlikti skeleto ir raumenų būklės tyrimą, siekiant pagerinti biomechaninių padėčių vystymąsi;</p>
          <p>3.4. leisti regos korekcijos specialistui, esant poreikiui, įvertinti regos a&scaron;trumą, siekiant gerinti vaikų regėjimą;</p>
          <p>3.5. gavę prane&scaron;imą apie skirtą vietą Įstaigoje, per 10 kalendorinių dienų turi kreiptis į Įstaigą, patvirtinti vaiko atvykimą ir pateikti visus reikalingus dokumentus (vaiko gimimo liudijimo kopiją, elektroninį sveikatos pažymėjimą ir vėliau kiekvienais metais (forma Nr. E027-1) bei pažymą, patvirtinančią, kad deklaracijoje gyvenamoji vieta nurodyta Klaipėdos rajono savivaldybė;</p>
          <p>3.6. pasiimti Ugdytinį i&scaron; Darželio per 2 valandas po to, kai Tėvams buvo prane&scaron;ta apie įtariamą Ugdytinio ligą ar susižeidimą;</p>
          <p>3.7. pirmą Ugdytinio neatvykimo dieną informuoti telefonu ar atvykus apie Ugdytinio ligą (pedikuliozę) ar kitą Darželio nelankymo priežastį iki 8.15 val. ryto grupės arba bendruoju telefonu;</p>
          <p>3.8. ligos atveju nevesti Ugdytinio į Darželį;</p>
          <p>3.9. informuoti apie bet kokius specialius Ugdytinio poreikius (ugdymosi, maisto, alergijos ir pan.);</p>
          <p>3.10. atlyginti Ugdytino padarytą materialinę žalą Darželiui ar kitiems asmenims, kurią vaikas padaro būdamas Darželyje;</p>
          <p>3.11. atvesti Ugdytinį į Darželį &scaron;varų, aprengtą tvarkingais, &scaron;variais drabužiais, esant tinkamoms oro sąlygoms, neprie&scaron;tarauti jo i&scaron;vedimui į lauką, pasirūpinti atsarginiais drabužiais vaikui perrengti;</p>
          <p>3.12. laiku, nustatyta tvarka ir terminais sumokėti Savivaldybės nustatyto dydžio mokestį už teikiamas paslaugas;</p>
          <p>3.13. laiku, numatyta tvarka ir terminais, sumokėti už Tėvų pageidavimu Ugdytiniui teikiamas papildomas paslaugas Darželyje;</p>
          <p>3.14. Ugdytinį privalo atlydėti į Darželį ir pasiimti i&scaron; Darželio suaugę asmenys. </p>
          <p>3.15. neleisti Ugdytiniui ne&scaron;tis į Darželį vertingų ir pavojingų daiktų ( mobiliųjų telefonų, fotoaparatų, elektroninių žaidimų, pinigų, a&scaron;trių daiktų, vaistų ir pan.) bei maisto produktų, galinčių sukelti pavojų vaikų sveikatai ir saugumui (saldumynų su kremu ar &scaron;okoladu, gėrimų su dažikliais, konservantais, saldikliais, bulvių tra&scaron;kučių ir pan.);</p>
          <p>3.16. sutikti, kad Ugdytinio asmens ir kiti teisės aktuose nustatyti duomenys bus tvarkomi teisės aktuose nustatytuose registruose;</p>
          <p>3.17. aprūpinti Ugdytinį individualiomis higienos ir ugdymosi priemonėmis. </p>
        </div>
        <p>4. Tėvai turi teisę:</p>
        <div>
          <p>4.1. žinoti vaiko ugdymosi rezultatus, i&scaron;kylančias socializacijos, psichologines ar pedagogines problemas;</p>
          <p>4.2. parinkti papildomo ugdymo veiklą (ekskursijas, i&scaron;vykas ir kitus papildomus edukacinius renginius) pagal vaiko poreikius ir Darželio galimybes.</p>
          <p>4.3. teikti siūlymus dėl ugdymo darbo organizavimo, ugdymo kokybės gerinimo, dalyvauti Tėvams skirtuose renginiuose, susirinkimuose, savivaldoje.</p></div>
      </div>
      <div className="container pb-2">
        <h6>III. SUTARTIES ĮSIGALIOJIMAS, GALIOJIMAS, KEITIMAS IR NUTRAUKIMAS</h6>
        <p>5. Sutartis įsigalioja nuo jos pasira&scaron;ymo dienos ir galioja iki Ugdytinis baigs ikimokyklinio ugdymo programą.</p>
        <p>6. Sutartis gali būti nutraukta:</p>
        <div>
          <p>6.1. &scaron;alių susitarimu;</p>
          <p>6.2. Tėvams viena&scaron;ali&scaron;kai parei&scaron;kus apie Sutarties nutraukimą prie&scaron; 10 darbo dienų;</p>
          <p>6.3. Darželis viena&scaron;ali&scaron;kai gali nutraukti Sutartį:</p>
          <p>6.3.1 kai Ugdytinio elgesys kelia realią ir akivaizdžią grėsmę Darželio vaikų arba Darželio darbuotojų saugumui;</p>
          <p>6.3.2. Tėvai nuolat pažeidinėja Sutarties 3.14 punkto reikalavimą laiku atvesti ir pasiimti ugdytinį;</p>
          <p>6.3.3. Tėvai vėluoja atsiskaityti už teikiamas paslaugas 2 mėnesius. Sutarties nutraukimas neatleidžia nuo prievolės sumokėti už suteiktas paslaugas.</p>
        </div>
        <p>7. Visi Sutarties pakeitimai, priedai ir papildymai sudaromi tik ra&scaron;tu, Sutartis turi būti registruota teisės aktų nustatyta tvarka.</p>
      </div>
      <div className="container pb-2">
        <h6>IV. GINČŲ SPRENDIMAS</h6>
        <p>8. Ginčytini ugdymo proceso organizavimo, Darželio veiklos, sutarties pažeidimo klausimai sprendžiami &scaron;alims geranori&scaron;kai bendradarbiaujant. Ginčytini klausimai pirmiausiai aptariami su grupės mokytoju, direktoriaus pavaduotoju ugdymui, kitais specialistais. Neradus sprendimo, kreipiamasi į Darželio direktorių.</p>
        <p>9. Tėvų pra&scaron;ymus dėl ginčų objektyvumo nagrinėja direktoriaus įsakymu sudaryta komisija, kurią sudaro administracijos, pedagogų ir ugdytinio atstovai.</p>
      </div><div className="container pb-2"><p></p>
        <p>Sutarties &scaron;alių para&scaron;ai:</p>
        <p>Ugdymo įstaigos atstovas: <b>{props.state.approvedKindergartenManager}</b> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; Tėvas/Globėjas: <b>{props.state.mainGuardianName} {props.state.mainGuardianSurname} </b></p>


        <div className="d-flex">
          {
            props.state.status === "Patvirtintas" &&
            <button
              id="CompensationReviewDownloadPDF"
              className="btn btn-outline-success btn-block me-2 no-breaks"
              onClick={() => props.handleDownloadContract(props.state)}
            >Parsisiųsti dokumentą pasirašymui
            </button>
          }
          <button
            id="CompensationReviewReturn"
            className="btn btn-outline-success btn-block"
            onClick={props.handleReturn}
          >Grįžti
          </button>
        </div>
      </div>
    </div >
  )
}