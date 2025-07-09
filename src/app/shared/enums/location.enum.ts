export enum LocationCode {
  // Federal Territories
  KUALA_LUMPUR = 'KUALA_LUMPUR',
  PUTRAJAYA = 'PUTRAJAYA',

  // Kedah
  ALOR_SETAR = 'ALOR_SETAR',
  LANGKAWI = 'LANGKAWI',
  SUNGAI_PETANI = 'SUNGAI_PETANI',

  // Kelantan
  KOTA_BHARU = 'KOTA_BHARU',

  // Melaka
  MELAKA = 'MELAKA',

  // Negeri Sembilan
  NILAI = 'NILAI',
  SEREMBAN = 'SEREMBAN',

  // Pahang
  KUANTAN = 'KUANTAN',
  TEMERLOH = 'TEMERLOH',

  // Penang
  BUKIT_MERTAJAM = 'BUKIT_MERTAJAM',
  BUTTERWORTH = 'BUTTERWORTH',
  GEORGE_TOWN = 'GEORGE_TOWN',

  // Perak
  IPOH = 'IPOH',
  TAIPING = 'TAIPING',

  // Perlis
  KANGAR = 'KANGAR',

  // Pahang (already covered – keep as listed)

  // Johor
  BATU_PAAT = 'BATU_PAAT',
  JOHOR_BAHRU = 'JOHOR_BAHRU',
  KLUANG = 'KLUANG',
  MUAR = 'MUAR',
  SKUDAI = 'SKUDAI',

  // Sabah
  KOTA_KINABALU = 'KOTA_KINABALU',
  SANDAKAN = 'SANDAKAN',
  TAWAU = 'TAWAU',

  // Sarawak
  BINTULU = 'BINTULU',
  KUCHING = 'KUCHING',
  MIRI = 'MIRI',
  SIBU = 'SIBU',

  // Selangor (expanded, sorted)
  AMPANG = 'AMPANG',
  BANGI = 'BANGI',
  BATU_CAVES = 'BATU_CAVES',
  CYBERJAYA = 'CYBERJAYA',
  GOMBAK = 'GOMBAK',
  KAJANG = 'KAJANG',
  KLANG = 'KLANG',
  PETALING_JAYA = 'PETALING_JAYA',
  PUCHONG = 'PUCHONG',
  RAWANG = 'RAWANG',
  SEMENYIH = 'SEMENYIH',
  SERDANG = 'SERDANG',
  SEPANG = 'SEPANG',
  SUBANG_JAYA = 'SUBANG_JAYA',
  SUNGAI_BULOH = 'SUNGAI_BULOH',
  SHAH_ALAM = 'SHAH_ALAM',
}

export const LocationLabels: Record<LocationCode, string> = {
  // Federal Territories
  [LocationCode.KUALA_LUMPUR]: 'Kuala Lumpur',
  [LocationCode.PUTRAJAYA]: 'Putrajaya',

  // Kedah
  [LocationCode.ALOR_SETAR]: 'Alor Setar, Kedah',
  [LocationCode.LANGKAWI]: 'Langkawi, Kedah',
  [LocationCode.SUNGAI_PETANI]: 'Sungai Petani, Kedah',

  // Kelantan
  [LocationCode.KOTA_BHARU]: 'Kota Bharu, Kelantan',

  // Melaka
  [LocationCode.MELAKA]: 'Melaka',

  // Negeri Sembilan
  [LocationCode.NILAI]: 'Nilai, Negeri Sembilan',
  [LocationCode.SEREMBAN]: 'Seremban, Negeri Sembilan',

  // Pahang
  [LocationCode.KUANTAN]: 'Kuantan, Pahang',
  [LocationCode.TEMERLOH]: 'Temerloh, Pahang',

  // Penang
  [LocationCode.GEORGE_TOWN]: 'George Town, Penang',
  [LocationCode.BUTTERWORTH]: 'Butterworth, Penang',
  [LocationCode.BUKIT_MERTAJAM]: 'Bukit Mertajam, Penang',

  // Perak
  [LocationCode.IPOH]: 'Ipoh, Perak',
  [LocationCode.TAIPING]: 'Taiping, Perak',

  // Perlis
  [LocationCode.KANGAR]: 'Kangar, Perlis',

  // Johor
  [LocationCode.JOHOR_BAHRU]: 'Johor Bahru, Johor',
  [LocationCode.BATU_PAAT]: 'Batu Pahat, Johor',
  [LocationCode.KLUANG]: 'Kluang, Johor',
  [LocationCode.MUAR]: 'Muar, Johor',
  [LocationCode.SKUDAI]: 'Skudai, Johor',

  // Sabah
  [LocationCode.KOTA_KINABALU]: 'Kota Kinabalu, Sabah',
  [LocationCode.SANDAKAN]: 'Sandakan, Sabah',
  [LocationCode.TAWAU]: 'Tawau, Sabah',

  // Sarawak
  [LocationCode.KUCHING]: 'Kuching, Sarawak',
  [LocationCode.MIRI]: 'Miri, Sarawak',
  [LocationCode.SIBU]: 'Sibu, Sarawak',
  [LocationCode.BINTULU]: 'Bintulu, Sarawak',

  // Selangor (expanded)
  [LocationCode.AMPANG]: 'Ampang, Selangor',
  [LocationCode.BANGI]: 'Bangi, Selangor',
  [LocationCode.BATU_CAVES]: 'Batu Caves, Selangor',
  [LocationCode.CYBERJAYA]: 'Cyberjaya, Selangor',
  [LocationCode.GOMBAK]: 'Gombak, Selangor',
  [LocationCode.KAJANG]: 'Kajang, Selangor',
  [LocationCode.KLANG]: 'Klang, Selangor',
  [LocationCode.PETALING_JAYA]: 'Petaling Jaya, Selangor',
  [LocationCode.PUCHONG]: 'Puchong, Selangor',
  [LocationCode.RAWANG]: 'Rawang, Selangor',
  [LocationCode.SEMENYIH]: 'Semenyih, Selangor',
  [LocationCode.SERDANG]: 'Serdang, Selangor',
  [LocationCode.SEPANG]: 'Sepang, Selangor',
  [LocationCode.SUBANG_JAYA]: 'Subang Jaya, Selangor',
  [LocationCode.SUNGAI_BULOH]: 'Sungai Buloh, Selangor',
  [LocationCode.SHAH_ALAM]: 'Shah Alam, Selangor',
};
