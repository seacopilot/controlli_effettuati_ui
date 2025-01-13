$(document).ready(function () {
    var datiInputPanel = $('#datiInput').kendoExpansionPanel({
        title: 'Dati Input',
        subTitle: 'Inserisci i dati richiesti',
        expanded: true
    });

    var analisiPanel = $('#analisi').kendoExpansionPanel({
        title: 'Analisi',
        subTitle: 'Risultati ottenuti',
    });



    $("#treeview").kendoTreeView({
        checkboxes: {
            checkChildren: true
        },
        dataSource: [
            {
                text: "Assetto Societario",
                expanded: false,
                items: [
                    { text: "Verifica Titolare Effettivo" },
                    { text: "Verifica Legale Rappresentante" },
                    { text: "Verifica Amministrazione Impresa" },
                    { text: "Verifica Residenza Esponenti Impresa Attenzionata" },
                    { text: "Catena Partecipativa" },
                    { text: "Verifica Sede Legale" },
                    { text: "Verifica sulla Struttura Societaria" },
                    { text: "Verifica Struttura Societaria Opaca" },
                    { text: "Verifica Modifiche Recenti / Frequenti Assetto Societario" },
                    { text: "Verifiche Variazioni Societarie" }
                ]
            },
            {
                text: "Economico-Finanziari",
                expanded: false,
                items: [
                    { text: "Controlli sul Bilancio" },
                    { text: "Ricavo per Addetto" },
                    { text: "Andamento dei Ricavi" },
                    { text: "Sproporzione tra Numero di Dipendenti e Fatturato" },
                    { text: "Coerenza Voci di Bilancio" },
                    { text: "Attivo di Bilancio - Immobilizzazioni Immateriali" },
                    { text: "Attivo di Bilancio - Crediti verso Clienti" },
                    { text: "Passivo Patrimoniale - Debiti verso Fornitori" },
                    { text: "Ricavi Elevati e Profilo Imprenditoriale del Socio Unico" },
                    { text: "Ingente Aumento di Capitale" },
                    { text: "Verifica IBAN" },
                    { text: "Verifica Apertura Conto Corrente Dedicato" },
                    { text: "Aiuti di Stato e Cumulabilità Finanziamenti Pubblici" },
                    { text: "Verifica Insoluti" },
                    { text: "Tracciabilità Flussi Finanziari" },
                    { text: "Deposito Bilanci" }
                ]
            },
            {
                text: "Reputazionali",
                expanded: false,
                items: [
                    { text: "Verifica Notizie di Stampa Negative" },
                    { text: "Verifica Liste PEP" },
                    { text: "Verifica Assenza Soggetti Sanzionati UE" },
                    { text: "Clienti Attenzionati" },
                    { text: "Verifica Questionario Paesi Maggiormente Sanzionati" },
                    { text: "Verifica Partecipazioni in Paesi Sanzionati" }
                ]
            },
            {
                text: "Attività d'Impresa",
                expanded: false,
                items: [
                    { text: "Verifica Codice ATECO" },
                    { text: "Verifica Sito Internet" }
                ]
            },
            {
                text: "Rispetto Norme Specifiche",
                expanded: false,
                items: [
                    { text: "Verifiche Conflitti di Interesse" },
                    { text: "Verifica Causa di Esclusione dal Beneficio" },
                    { text: "Verifiche Antimafia" },
                    { text: "Verifica CUP" },
                    { text: "Verifica Informativa Anticorruzione" },
                    { text: "Verifica Regolarità Contributiva (DURC)" }
                ]
            },
            {
                text: "Altro",
                expanded: false,
                items: [
                    { text: "Controllo Extra" }
                ]
            }
        ]
    });


    // Evento sul pulsante Avvia Ricerca
    $("#btnRicerca").click(function () {
        // Recupera i valori degli input
        var identificativo = $("#identificativo").val();
        var nazionalita = $("#nazionalita").val();
        var dataCorrente = new Date().toLocaleString();

        // Verifica che i campi siano compilati
        if (identificativo && nazionalita) {
            // Aggiunge un nuovo elemento alla griglia
            var grid = $("#grid").data("kendoGrid");
            grid.dataSource.add({
                azienda: identificativo,
                utente: "utente_corrente",
                stato: "✔",
                data: dataCorrente
            });

            // Collassa il pannello Dati Input e espande Analisi
            datiInputPanel.collapse();
            analisiPanel.expand();
        } else {
            alert("Compila tutti i campi prima di avviare la ricerca.");
        }
    });

    $("#btnReset").click(function () {
        // Svuota i campi di input e selezione
        $("#identificativo").val("");
        $("#nazionalita").val("");
    });

    $('#menu').kendoMenu({
        dataSource: menuData,
        orientation: 'vertical',
        select: function(e) {
            const content = $(e.item).attr('data-content');
            if (content) {
                const title = $(e.item).text().trim();
                $('#content-container').html('<h3>' + title + '</h3>' + content);
            } else {
                // Previene la selezione per i genitori senza contenuto
                e.preventDefault();
            }
        }
    });
});

function findMenuItem(text, items) {
    for (let item of items) {
        if (item.text === text) return item;
        if (item.items) {
            const found = findMenuItem(text, item.items);
            if (found) return found;
        }
    }
    return null;
}

$("#splitter").kendoSplitter({
    orientation: "horizontal",
    panes: [
        {
            size: "50%",
            scrollable: false,
            collapsible: true,
            resizable: true // Permette di visualizzare e muovere la barra dello splitter
        },
        {
            scrollable: false,
            collapsible: true,
            collapsed: false,
            resizable: true // Permette di visualizzare e muovere la barra dello splitter
        }
    ]
});

$("#grid").kendoGrid({
    dataSource: {
        data: [
            { azienda: "A RAYMOND ET COMPAGNIE", utente: "admin", stato: "✔", data: "20/12/2024 13:51:09" },
            { azienda: "RAYGROUP", utente: "admin", stato: "✔", data: "20/12/2024 13:46:20" },
            { azienda: "TECHNOSOFT S.R.L.", utente: "admin", stato: "✔", data: "20/12/2024 14:10:45" },
            { azienda: "INNOVATECH S.P.A.", utente: "admin", stato: "✔", data: "20/12/2024 14:20:30" },
            { azienda: "GLOBAL TRADE LTD.", utente: "admin", stato: "✔", data: "20/12/2024 14:35:15" },
            { azienda: "NEXTGEN SYSTEMS", utente: "admin", stato: "✔", data: "20/12/2024 14:50:00" },
            { azienda: "FUTURETECH GROUP", utente: "admin", stato: "✔", data: "20/12/2024 15:05:45" }
        ],
        pageSize: 10
    },
    pageable: true,
    columns: [
        {
            selectable: true,
            sortable: false,
            width: 30,
            minResizableWidth: 30
        },
        { field: "azienda", title: "Identificativo" },
        { field: "utente", title: "Utente" },
        { field: "stato", title: "Esito" },
        { field: "data", title: "Data Analisi" },
        {
            title: "Scarica Report",
            template: '<button class="button button-download" onclick="scaricaReport(#= azienda #)">Scarica</button>'
        }
    ]
});

function scaricaReport(azienda) {
    alert("Scaricamento report per: " + azienda);
    // Inserisci qui la logica per scaricare il file
}



function determineParentStatus(items) {
    let allSuccess = true;
    let allFail = true;

    items.forEach((item) => {
        if (item.iconClass === "icon-fail") {
            allSuccess = false;
        }
        if (item.iconClass === "icon-success") {
            allFail = false;
        }
    });

    if (allSuccess) {
        return "icon-success";
    } else if (allFail) {
        return "icon-fail";
    } else {
        return "icon-warning";
    }
}

const treeData = [
    {
        text: "Assetto Societario",
        items: [
            {
                text: "Verifica Titolare Effettivo",
                iconClass: "icon-success",
                encoded: false,
                content: "<p>✅ <strong>Verifica completata:</strong> Il Titolare Effettivo è stato correttamente verificato. Nessuna anomalia riscontrata nei dati anagrafici e nelle verifiche AML. <br>Tutte le informazioni risultano coerenti e aggiornate.</p>" +
                         "<p><em>Esempio:</em> Il Titolare Effettivo <strong>Giulia Bianchi</strong>, nata il 15/03/1980, residente in <strong>Via Verdi 23, 10121 Torino (TO)</strong>, risulta regolarmente registrata e senza precedenti penali.</p>"
            },            
            {
                text: "Verifica Legale Rappresentante",
                iconClass: "icon-fail",
                encoded: false,
                content: "<p>❌ <strong>Attenzione:</strong> La verifica ha evidenziato incongruenze nei dati del Legale Rappresentante. Differenze nei documenti identificativi e possibili anomalie nei precedenti professionali richiedono ulteriori approfondimenti.</p>" +
                         "<p><em>Esempio:</em> Il Legale Rappresentante <strong>Mario Rossi</strong> risulta residente in <strong>Via delle Industrie 45, 20100 Milano (MI)</strong>, <br>mentre nei documenti ufficiali è indicato un diverso indirizzo: <strong>Via Roma 12, 20121 Milano (MI)</strong>. Questa discrepanza necessita di ulteriori verifiche per accertare la correttezza dei dati dichiarati.</p>"
            },            
            {
                text: "Verifica Amministrazione Impresa",
                iconClass: "icon-warning",
                encoded: false,
                content: "<p>⚠️ <strong>Avviso:</strong> Alcuni amministratori risultano coinvolti in procedimenti legali in corso. È consigliabile approfondire i dettagli delle cause e valutare il rischio associato.</p>" +
                         "<p><em>Esempio:</em> L'amministratore <strong>Luca Verdi</strong> è coinvolto in un procedimento per frode fiscale presso il Tribunale di Milano.</p>"
            },            
            {
                text: "Verifica Residenza Esponenti Impresa Attenzionata",
                iconClass: "icon-fail",
                encoded: false,
                content: "<p>🚩 <strong>Segnalazione di rischio:</strong> Uno o più esponenti dell'impresa risultano residenti in aree geografiche a rischio elevato secondo i criteri AML. <br>Potrebbe essere necessario intensificare i controlli.</p>" +
                         "<p><em>Esempio:</em> Il socio <strong>Andrea Neri</strong> risiede in <strong>Via del Porto 10, 80121 Napoli (NA)</strong>, area segnalata per elevata criminalità finanziaria.</p>"
            },            
            {
                text: "Catena Partecipativa",
                iconClass: "icon-success",
                encoded: false,
                content: "<p>🔗 <strong>Verifica positiva:</strong> La catena partecipativa è chiara e trasparente. Tutti i livelli societari sono stati verificati e non sono emersi collegamenti con entità a rischio.</p>" +
                         "<p><em>Esempio:</em> La società è partecipata al 100% da <strong>Holding ABC S.p.A.</strong>, con sede in <strong>Via Manzoni 5, 20121 Milano (MI)</strong>.</p>"
            },            
            {
                text: "Verifica Sede Legale",
                iconClass: "icon-fail",
                encoded: false,
                content: "<p>🏢❌ <strong>Problema riscontrato:</strong> La sede legale non risulta attiva o verificata. L'indirizzo registrato non corrisponde a un'ubicazione operativa.</p>" +
                         "<p><em>Esempio:</em> L'indirizzo <strong>Via Firenze 22, 00184 Roma (RM)</strong> risulta inesistente secondo i registri catastali.</p>"
            },
            {
                text: "Verifica sulla Struttura Societaria",
                iconClass: "icon-warning",
                encoded: false,
                content: "<p>📊⚠️ <strong>Modifiche rilevate:</strong> Sono emerse modifiche recenti nella struttura societaria. Queste variazioni potrebbero influenzare <br> la governance aziendale e meritano un'analisi dettagliata.</p>" +
                         "<p><em>Esempio:</em> La seguente tabella mostra gli amministratori attuali:</p>" +
                         "<div id='grid-struttura'></div>" +
                         "<script>" +
                         "$('#grid-struttura').kendoGrid({" +
                         "    dataSource: {" +
                         "        data: [" +
                         "            { Nome: 'Luca Bianchi', Ruolo: 'CEO', Inizio: '01/01/2018' }," +
                         "            { Nome: 'Marco Verdi', Ruolo: 'CFO', Inizio: '15/03/2019' }," +
                         "            { Nome: 'Giulia Neri', Ruolo: 'CTO', Inizio: '10/07/2020' }," +
                         "            { Nome: 'Anna Russo', Ruolo: 'COO', Inizio: '05/05/2021' }," +
                         "            { Nome: 'Paolo Gallo', Ruolo: 'HR Manager', Inizio: '12/09/2022' }" +
                         "        ]," +
                         "        pageSize: 5" +
                         "    }," +
                         "    pageable: true," +
                         "    width: 1000," +
                         "    columns: [" +
                         "        { field: 'Nome', title: 'Nome' }," +
                         "        { field: 'Ruolo', title: 'Ruolo' }," +
                         "        { field: 'Inizio', title: 'Data di Inizio' }" +
                         "    ]" +
                         "});" +
                         "</script>"
            },
            {
                text: "Verifica Struttura Societaria Opaca",
                iconClass: "icon-fail",
                encoded: false,
                content: "<p>🌫️❌ <strong>Opacità rilevata:</strong> La struttura societaria presenta caratteristiche di opacità con partecipazioni indirette non facilmente tracciabili.</p>" +
                         "<p><em>Esempio:</em> Partecipazione indiretta attraverso la società offshore <strong>XYZ Ltd.</strong>, registrata alle Isole Cayman.</p>"
            },
            { 
                text: "Verifica Modifiche Recenti / Frequenti Assetto Societario", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>🔄⚠️ <strong>Frequenti modifiche:</strong> Sono state rilevate modifiche frequenti nell'assetto societario. Questo comportamento potrebbe indicare <br>una strategia di elusione o una gestione instabile.</p>" 
            },
            { 
                text: "Verifiche Variazioni Societarie", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>🔍❌ <strong>Anomalie riscontrate:</strong> Variazioni societarie non giustificate sono state individuate. Alcuni cambiamenti non risultano coerenti con <br> le attività aziendali dichiarate. Si raccomanda un approfondimento.</p>" 
            }
        ]
        
    },
    {
        text: "Economico-Finanziari",
        items: [
            { 
                text: "Controlli sul Bilancio", 
                iconClass: "icon-success", 
                encoded: false, 
                content: "<p>✅ <strong>Verifica completata:</strong> Il bilancio aziendale è stato analizzato in dettaglio. Tutte le voci risultano coerenti con i dati contabili <br> presentati e non sono state rilevate irregolarità o discrepanze.</p>"
            },
            { 
                text: "Ricavo per Addetto", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Avviso:</strong> Il ricavo medio per addetto risulta inferiore rispetto alla media di settore. Potrebbe indicare una bassa produttività o <br> una gestione poco efficiente delle risorse umane.</p>"
            },
            { 
                text: "Andamento dei Ricavi", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Anomalia rilevata:</strong> L'analisi dei ricavi evidenzia una contrazione significativa negli ultimi esercizi. È consigliabile verificare <br> le cause di questa flessione, come la perdita di clienti o cali nella domanda di mercato.</p>"
            },
            {
                text: "Sproporzione tra Numero di Dipendenti e Fatturato",
                iconClass: "icon-warning",
                encoded: false,
                content: "<p>⚠️ <strong>Squilibrio operativo:</strong> È stata rilevata una discrepanza tra il numero di dipendenti e il fatturato dichiarato. <br> Potrebbe trattarsi di una gestione inefficiente o di una sovrastima delle risorse.</p>" +
                         "<p><strong>Esempio:</strong> L'azienda <strong>XYZ S.r.l.</strong> dichiara un fatturato annuo di <strong>€ 15.000.000</strong> con soli <strong>5 dipendenti</strong>, mentre la media di settore prevede almeno <strong>30 dipendenti</strong> per questo volume di affari.</p>" +
                         
                         "<p><strong>Analisi delle voci di bilancio:</strong></p>" +
                         
                         "<div id='grid-bilancio'></div>" +
                         "<script>" +
                         "$('#grid-bilancio').kendoGrid({" +
                         "    dataSource: {" +
                         "        data: [" +
                         "            { Voce: 'Ricavi delle vendite', Importo: '€ 15.000.000' }," +
                         "            { Voce: 'Costo del personale', Importo: '€ 250.000' }," +
                         "            { Voce: 'Utile netto', Importo: '€ 8.000.000' }," +
                         "            { Voce: 'Numero Dipendenti', Importo: '5' }," +
                         "            { Voce: 'Costo medio per dipendente', Importo: '€ 50.000' }" +
                         "        ]," +
                         "        pageSize: 5" +
                         "    }," +
                         "    pageable: false," +
                         "    width: 1000," +
                         "    columns: [" +
                         "        { field: 'Voce', title: 'Voce di Bilancio' }," +
                         "        { field: 'Importo', title: 'Importo' }" +
                         "    ]" +
                         "});" +
                         "</script>"
            },
            { 
                text: "Coerenza Voci di Bilancio", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Incoerenze rilevate:</strong> Alcune voci di bilancio non risultano coerenti con le attività aziendali dichiarate. <br>  Si raccomanda una revisione approfondita per evitare rischi contabili o fiscali.</p>"
            },
            { 
                text: "Attivo di Bilancio - Immobilizzazioni Immateriali", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Attenzione:</strong> Le immobilizzazioni immateriali presentano valori elevati rispetto al totale dell’attivo. <br> Potrebbe esserci una sovrastima di asset intangibili come brevetti o marchi.</p>"
            },
            { 
                text: "Attivo di Bilancio - Crediti verso Clienti", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Rischio credito:</strong> I crediti verso clienti risultano eccessivi e potrebbero indicare difficoltà di <br> incasso o una gestione poco efficace del credito commerciale.</p>"
            },
            { 
                text: "Passivo Patrimoniale - Debiti verso Fornitori", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Debiti elevati:</strong> I debiti verso fornitori risultano superiori alla media del settore. È opportuno <br> verificare eventuali ritardi nei pagamenti o difficoltà finanziarie.</p>"
            },
            { 
                text: "Ricavi Elevati e Profilo Imprenditoriale del Socio Unico", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Incongruenza rilevata:</strong> I ricavi aziendali appaiono sproporzionati rispetto all’esperienza e al profilo <br> imprenditoriale del socio unico. Potrebbe essere un segnale di anomalie nei flussi finanziari.</p>"
            },
            { 
                text: "Ingente Aumento di Capitale", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Aumento sospetto:</strong> È stato registrato un aumento di capitale significativo senza una giustificazione chiara. <br> Si consiglia di verificare la provenienza dei fondi e la finalità dell'operazione.</p>"
            },
            { 
                text: "Verifica IBAN", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>IBAN non conforme:</strong> L’IBAN fornito non risulta associato a un conto intestato all’azienda. Potrebbe trattarsi <br> di un errore o di un tentativo di frode finanziaria.</p>"
            },
            { 
                text: "Verifica Apertura Conto Corrente Dedicato", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Conto corrente non verificato:</strong> Non risultano evidenze di un conto corrente dedicato alle operazioni aziendali.<br>  Questa mancanza potrebbe ostacolare la tracciabilità dei flussi finanziari.</p>"
            },
            { 
                text: "Aiuti di Stato e Cumulabilità Finanziamenti Pubblici", 
                iconClass: "icon-success", 
                encoded: false, 
                content: "<p>✅ <strong>Conformità verificata:</strong> Gli aiuti di Stato e i finanziamenti pubblici sono stati ricevuti in modo conforme <br> alle normative vigenti, senza sovrapposizioni o irregolarità.</p>"
            },
            { 
                text: "Verifica Insoluti", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Pagamenti insoluti:</strong> Sono stati rilevati diversi insoluti nei pagamenti a fornitori e partner commerciali. <br> Questa situazione potrebbe compromettere la credibilità finanziaria dell'azienda.</p>"
            },
            { 
                text: "Tracciabilità Flussi Finanziari", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Flussi non completamente tracciabili:</strong> Sono emerse difficoltà nel monitoraggio dei flussi finanziari. <br> È consigliabile implementare sistemi di controllo più efficaci per garantire la trasparenza.</p>"
            },
            { 
                text: "Deposito Bilanci", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Bilanci non depositati:</strong> Non risultano depositati i bilanci per gli ultimi esercizi. Questa omissione <br>  può comportare sanzioni e ridurre la trasparenza aziendale.</p>"
            }
        ]
    },
    {
        text: "Reputazionali",
        items: [
            { 
                text: "Verifica Notizie di Stampa Negative", 
                iconClass: "icon-success", 
                encoded: false, 
                content: "<p>✅ <strong>Esito positivo:</strong> Non sono emerse notizie di stampa negative relative all'azienda o ai suoi esponenti. <br> L'immagine pubblica risulta solida e priva di controversie.</p><p><em>Esempio:</em> Nessuna menzione negativa sui principali quotidiani economici negli ultimi 24 mesi.</p>"
            },
            { 
                text: "Verifica Liste PEP", 
                iconClass: "icon-success", 
                encoded: false, 
                content: "<p>✅ <strong>Conformità verificata:</strong> Nessun socio o dirigente risulta presente nelle liste di Persone Politicamente Esposte (PEP). <br> Non emergono rischi di coinvolgimento in attività politiche influenti.</p><p><em>Esempio:</em> Nessun amministratore risulta legato a cariche pubbliche o enti governativi.</p>"
            },
            { 
                text: "Verifica Assenza Soggetti Sanzionati UE", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Anomalia rilevata:</strong> È stato identificato un collegamento indiretto con soggetti sanzionati dall'Unione Europea. È necessario approfondire le relazioni commerciali.</p><p><em>Esempio:</em> La società 'Beta Srl', partner commerciale, è inclusa nella lista di sanzioni UE per violazioni finanziarie.</p>"
            },
            { 
                text: "Clienti Attenzionati", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Avviso:</strong> Alcuni clienti sono inclusi in elenchi di soggetti a rischio elevato. <br> Si consiglia di rafforzare le procedure di due diligence.</p><p><em>Esempio:</em> Il cliente 'GlobalTrade Ltd' è stato segnalato per operazioni sospette in Paesi offshore.</p>"
            },
            { 
                text: "Verifica Questionario Paesi Maggiormente Sanzionati", 
                iconClass: "icon-success", 
                encoded: false, 
                content: "<p>✅ <strong>Verifica completata:</strong> L'azienda ha dichiarato di non avere rapporti <br> con Paesi soggetti a restrizioni o sanzioni internazionali.</p><p><em>Esempio:</em> Nessuna attività rilevata in Iran, Corea del Nord o Siria.</p>"
            },
            { 
                text: "Verifica Partecipazioni in Paesi Sanzionati", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Rischio identificato:</strong> Sono state rilevate partecipazioni societarie <br> in Paesi soggetti a sanzioni economiche. È fondamentale valutare le implicazioni legali.</p><p><em>Esempio:</em> La controllata 'Omega Holdings' è registrata nelle Isole Vergini Britanniche, area a rischio fiscale elevato.</p>"
            }
        ]
    },    
    {
        text: "Attività d'Impresa",
        items: [
            { 
                text: "Verifica Codice ATECO", 
                iconClass: "icon-warning", 
                encoded: false, 
                content: "<p>⚠️ <strong>Incongruenza rilevata:</strong> Il codice ATECO dichiarato non è pienamente<br>  coerente con le attività effettivamente svolte dall’azienda. È consigliabile aggiornare i dati presso la Camera di Commercio.</p><p><em>Esempio:</em> L'azienda opera nel settore IT ma risulta registrata con il codice ATECO per il commercio al dettaglio.</p>"
            },
            { 
                text: "Verifica Sito Internet", 
                iconClass: "icon-fail", 
                encoded: false, 
                content: "<p>❌ <strong>Problemi riscontrati:</strong> Il sito web ufficiale risulta inattivo o incompleto, <br> con contenuti scarsi o non aggiornati. Questo può influire negativamente sulla reputazione aziendale.</p><p><em>Esempio:</em> Il dominio 'www.aziendaesempio.com' restituisce errore 404 o è privo di contenuti rilevanti.</p>"
            }
        ]
    },    
    {
        text: "Rispetto Norme Specifiche",
        items: [
            { text: "Verifiche Conflitti di Interesse", iconClass: "icon-warning", encoded: false },
            { text: "Verifica Causa di Esclusione dal Beneficio", iconClass: "icon-fail", encoded: false },
            { text: "Verifiche Antimafia", iconClass: "icon-success", encoded: false },
            { text: "Verifica CUP", iconClass: "icon-success", encoded: false },
            { text: "Verifica Informativa Anticorruzione", iconClass: "icon-warning", encoded: false },
            { text: "Verifica Regolarità Contributiva (DURC)", iconClass: "icon-fail", encoded: false }
        ]
    },
    {
        text: "Altro",
        items: [
            { text: "Controllo Extra", iconClass: "icon-success", encoded: false }
        ]
    }
];


const menuData = treeData.map((area) => {
    const statusIcon = determineParentStatus(area.items);
    return {
        text: `<span class="menu-icon ${statusIcon}"></span>${area.text}`,
        encoded: false,
        items: area.items.map((item) => ({
            text: `<span class="menu-icon ${item.iconClass}"></span>${item.text}`,
            encoded: false,
            attr: { 'data-content': item.content }
        })),
    };
});




function expandLeftPanel() {
    var splitter = $("#splitter").data("kendoSplitter");
    //splitter.options.panes[0].collapsible = true;
    splitter.expand(".k-pane:first");
}

function collapseLeftPanel(collapsible) {
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.collapse(".k-pane:first");

    //splitter.options.panes[0].collapsible = collapsible;
}