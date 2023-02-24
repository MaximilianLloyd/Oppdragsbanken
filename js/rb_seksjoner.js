const ifKnapper = document.querySelectorAll('.ifKnapp');// Henter alle knappelementene
let forrigeSeksjon = null;// Lagrer en referanse til den forrige synlige seksjonen
let aktivKnappID = localStorage.getItem('aktivKnapp');// Henter den lagrede id-en til den aktive knappen fra local storage

// Legger til en hendelseslytter for klikk på hver knapp
ifKnapper.forEach(knapp => {
  knapp.addEventListener('click', () => {
    const seksjonID = knapp.dataset.seksjon; // Henter ID-en til innholdsseksjonen som tilsvarer knappen
    const knappID = knapp.dataset.knapp; // Henter ID-en til knappen som ble klikket på
    const farge = knapp.dataset.farge; // Henter ID-en til fargen for knappen som ble klikket på
    const seksjon = document.querySelector('.ifSeksjon[data-seksjon="' + knappID + '"]');  // Henter den tilsvarende seksjonen
    const aktivKnapp = document.querySelector('.ifKnapp.aktiv'); // Fjerner aktiv klasse fra forrige knapp og setter tilbake opprinnelig farge

    if (aktivKnapp !== null) {
      const aktivFarge = aktivKnapp.dataset.farge;
      aktivKnapp.classList.remove('aktiv');
      aktivKnapp.querySelector('.ifKnappIkon').style.stroke = 'var(--clr-tekst)';
      aktivKnapp.querySelector('.ifKnappIkon svg circle').style.fill = 'var(--clr-tekst)';
      aktivKnapp.querySelector('.ifKnapptittel').style.color = 'var(--clr-tekst)';
    }

    // Skjuler den forrige synlige seksjonen hvis det finnes en, med mindre det er den samme seksjonen som den vi klikket på
    if (forrigeSeksjon !== null && forrigeSeksjon !== seksjon) {
      forrigeSeksjon.style.maxHeight = '0px';
      forrigeSeksjon.classList.remove('synlig');
    }

    // Hvis seksjonen allerede er synlig, skjul den og fjern aktiv-status
    if (seksjon.classList.contains('synlig')) {
      seksjon.style.maxHeight = '0px'; // Setter max-height til 0
      seksjon.classList.remove('synlig');
      localStorage.removeItem('aktivKnapp'); // Fjerner den lagrede id-en til den aktive knappen fra local storage
    } else { // Ellers gjør den synlig og legg til aktiv-status
      const mHeight = seksjon.scrollHeight; // Måler høyden på seksjonen og setter max-height til denne verdien
      seksjon.style.maxHeight = mHeight + 'px';
      seksjon.classList.add('synlig');
      knapp.classList.add('aktiv');
      knapp.querySelector('.ifKnappIkon').style.stroke = 'var(--aktiv-farge)';
      knapp.querySelector('.ifKnappIkon svg circle').style.fill = 'var(--aktiv-farge)';
      knapp.querySelector('.ifKnapptittel').style.color = 'var(--aktiv-farge)';
      localStorage.setItem('aktivKnapp', knappID); // Lagrer id-en til den aktive knappen i local storage
    }

    // Oppdaterer referansen til forrige synlige seksjon
    forrigeSeksjon = seksjon;

    // console.log(`Klikk på ${knappID}. Seksjon synlighet: ${seksjon.classList.contains('synlig')}`);
  });

  // Aktiver knappen som var aktiv da siden ble lastet inn på nytt
  if (knapp.dataset.knapp === aktivKnappID) {
    knapp.click();
  }
});