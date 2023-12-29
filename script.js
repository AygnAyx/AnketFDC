// Başlangıç ekranını gizle, anket formunu göster
function baslaAnket() {
    document.getElementById("baslangicEkrani").style.display = "none";
    document.getElementById("anketForm").style.display = "block";
    kontrolVeGizle();
}

var aktifSayfa = 1; // Başlangıçta ilk sayfa aktif
guncelleSayfaBilgisi(aktifSayfa);
document.addEventListener("keydown", enterTuşunaBasildi);

function enterTuşunaBasildi(event) {
    // Eğer basılan tuş "Enter" ise ve anket formu görüntüleniyorsa
    if (event.key === "Enter" && document.getElementById("anketForm").style.display === "block") {
        sonrakiSayfa();
    }
}

function gostericiUzunluguGuncelle(gostericiId, Degisken) {
    var gosterici = document.getElementById(gostericiId);
    // Hesaplamak için uygun bir formülü kullanabilirsiniz
    var yeniUzunluk = Degisken * 20 + 'px'; // Örnek bir formül, ihtiyaca göre değiştirilebilir
    gosterici.style.flex = '0 0 ' + yeniUzunluk;

    // Gosterici2'yi etkilemek için
    gosterici.style.background = 'lime'; // Veya istediğiniz başka bir stil değişikliği yapabilirsiniz
}

// Sayfa geçiş fonksiyonları
function oncekiSayfa() {
    if (aktifSayfa > 1) {
        /*
        if (!kontrolleriKontrolEt("hiz" + aktifSayfa, "defans" + aktifSayfa, "sut" + aktifSayfa, "pas" + aktifSayfa, "kalecilik" + aktifSayfa)) {
            return;
        }
        */
        
        document.getElementById("sayfa" + aktifSayfa).style.display = "none";
        aktifSayfa--;
        document.getElementById("sayfa" + aktifSayfa).style.display = "block";
        kontrolVeGizle();
        guncelleSayfaBilgisi(aktifSayfa);
    }
}

function sonrakiSayfa() {
    
    if (aktifSayfa < 44) {
        if (!kontrolleriKontrolEt("hiz" + aktifSayfa, "defans" + aktifSayfa, "sut" + aktifSayfa, "pas" + aktifSayfa, "kalecilik" + aktifSayfa)) {
            return;
        }
        
        document.getElementById("sayfa" + aktifSayfa).style.display = "none";
        aktifSayfa++;
        document.getElementById("sayfa" + aktifSayfa).style.display = "block";
        kontrolVeGizle();
        guncelleSayfaBilgisi(aktifSayfa);
    }
}

// Anketi bitir fonksiyonu
function anketiBitir() {
    if (!kontrolleriKontrolEt("hiz" + aktifSayfa, "defans" + aktifSayfa, "sut" + aktifSayfa, "pas" + aktifSayfa, "kalecilik" + aktifSayfa)) {
        return;
    }

    degerleriYazdir(); // Değerleri yazdır fonksiyonunu çağır
    alert("Anketi başarıyla tamamladınız!");
    kontrolVeGizle();
    // İsterseniz burada başka bir aksiyon ekleyebilirsiniz.
}

// Kaydet fonksiyonu (her sayfa için ayrı değerleri kaydetmek istiyorsanız kullanabilirsiniz)
function kaydet() {
    if (!kontrolleriKontrolEt("hiz" + aktifSayfa, "defans" + aktifSayfa, "sut" + aktifSayfa, "pas" + aktifSayfa, "kalecilik" + aktifSayfa)) {
        return;
    }

    alert("Değerler kaydedildi!");
    sonrakiSayfa();
    kontrolVeGizle();
}

// Anketi bitir butonunu kontrol et ve gizle
function kontrolVeGizle() {
    var anketiBitirButton = document.getElementById("anketiBitirButton");
    //var anketiBitirTextBox = document.getElementById("textBox");

    if (aktifSayfa === 44) {
        anketiBitirButton.style.display = "block";
        anketiBitirTextBox.style.display = "block";
    } else {
        anketiBitirButton.style.display = "none";
        anketiBitirTextBox.style.display = "none";
    }
}

// Sayfa bilgisini güncelle
function guncelleSayfaBilgisi(sayfa) {
    var sayfaBilgisi = "Sayfa: " + sayfa + "/44";
    document.getElementById("sayfaBilgisi").textContent = sayfaBilgisi;
}

// Ankete bitirildikten sonra girilen değerleri içeren tek bir satırı oluştur ve ekrana yazdır
function degerleriYazdir() {
    var sonuclarDiv = document.getElementById("sonuclar");
    var sonuclarTextarea = document.getElementById("sonuclarTextarea");


    // Temizleme işlemi
    sonuclarDiv.innerHTML = "";

    var birlesikBilgi = "";

    for (var i = 1; i <= 44; i++) {
        birlesikBilgi += "O" + i;
        birlesikBilgi += "H" + document.getElementById("hiz" + i).value;
        birlesikBilgi += "D" + document.getElementById("defans" + i).value;
        birlesikBilgi += "Ş" + document.getElementById("sut" + i).value;
        birlesikBilgi += "P" + document.getElementById("pas" + i).value;
        birlesikBilgi += "K" + document.getElementById("kalecilik" + i).value;
    }

    // Tek satırda yazdırma
    sonuclarTextarea.value = birlesikBilgi;

}

// Değer kontrol fonksiyonu
function kontrolleriKontrolEt(hizId, defansId, sutId, pasId, kalecilikId) {
    var hiz = parseInt(document.getElementById(hizId).value) || 0;
    var defans = parseInt(document.getElementById(defansId).value) || 0;
    var sut = parseInt(document.getElementById(sutId).value) || 0;
    var pas = parseInt(document.getElementById(pasId).value) || 0;
    var kalecilik = parseInt(document.getElementById(kalecilikId).value) || 0;
    var kalanPuan = 0;

    
    if (hiz > 8 || defans > 8 || sut > 8 || pas > 8 || kalecilik > 8) {
        alert("Değerler 8'den büyük olamaz.");
        return false;
    }
    
    var toplamPuan = hiz + defans + sut + pas + kalecilik;
    
    kalanPuan = 20 - toplamPuan;
    var kalanPuanElement = document.getElementById("kalanPuan" + aktifSayfa);
    
    kalanPuanElement.textContent = kalanPuan;
    kalanPuanElement.classList.toggle("kalanPuan", kalanPuan < 0);
    
    if (hiz < 1 || defans < 1 || sut < 1 || pas < 1 || kalecilik < 1) {
        alert("Değerler 1'den küçük olamaz.");
        return false;
    }

    if (toplamPuan > 20) {
        alert("Toplam puan 20'den fazla olamaz. Lütfen tekrar kontrol edin.");
        return false;
    }

    if (kalanPuan < 0) {
        alert("Toplam puan 20'den fazla! Lütfen değerleri düzeltin.");
        return false;
    } else if (kalanPuan > 0) {
        alert("Toplam puan 20'ye ulaşmadı! Lütfen değerleri düzeltin.");
        return false;
    }
    return true;
}
