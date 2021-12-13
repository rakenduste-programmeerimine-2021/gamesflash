# Gamesflash

## Autorid:
Enri Gregor Riim & Oliver Antsov

## Projekti lühikirjeldus:
Gaming-suunaline foorum, kus on erinevate mängude alamsektsioon ning lisaks ka “Sotsiaal” sektsioon, mille kaudu on võimalik leida sõpru ning mängukaaslasi.

## Funktsionaalsus:
Kasutajate registreerimine ja sisselogimine; 
Postituste loomine/muutmine/kustutamine;
Kõikide postituste vaade;
Postituste otsimine;
Üksiku postituse detailsem vaade;
Postituse kommenteerimine;
Kasutajaprofiili vaade (millal loodud, mis on tema postitused, statistika: palju postitusi ja kommentaare);
Admin vaade (kasutajate ja postituse kustutamine)

## Kasutamine:
Vaja alla tõmmata Docker Desktop;
Peale meie failide alla tõmbamist jooksutada kaustas local-dev järgmised commandid:
		docker-compose run --rm --no-deps backend-node install;
		docker-compose run --rm --no-deps frontend-react install;
		kena oleks jooksutada backend-node kaustas: npm install cors;
		ja lõpuks docker-compose up -d
		
Peatamiseks: docker-compose stop;

## Wireframe link:
https://miro.com/app/board/o9J_ljxtXZk=/?invite_link_id=656239445346

Projekt on tehtud Tallinna Ülikooli Informaatika õppeaine “Rakenduste programmeerimine” raames.
