package com.mytrip.mytripservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mytrip.mytripservice.model.LocationOverview;

import java.util.List;

public class Test {
    public static void main(String[] args) {
        String json = "{\"response\":{\"header\":{\"resultCode\":\"0000\",\"resultMsg\":\"OK\"},\"body\":{\"items\":{\"item\":[{\"addr1\":\"전북특별자치도 전주시 덕진구 백제대로 567 (금암동)\",\"addr2\":\"\",\"areacode\":\"37\",\"booktour\":\"\",\"cat1\":\"A01\",\"cat2\":\"A0101\",\"cat3\":\"A01010500\",\"contentid\":\"3082719\",\"contenttypeid\":\"12\",\"createdtime\":\"202401181743\",\"firstimage\":\"http://tong.visitkorea.or.kr/cms/resource/18/3082718_image2_1.jpg\",\"firstimage2\":\"http://tong.visitkorea.or.kr/cms/resource/18/3082718_image3_1.jpg\",\"cpyrhtDivCd\":\"Type3\",\"mapx\":\"127.1320319577\",\"mapy\":\"35.8407943328\",\"mlevel\":\"6\",\"modifiedtime\":\"20240118174312\",\"sigungucode\":\"12\",\"tel\":\"\",\"title\":\"전북대학교 벚꽃길\"},{\"addr1\":\"충청남도 태안군 남면 달산포로 311\",\"addr2\":\"\",\"areacode\":\"34\",\"booktour\":\"\",\"cat1\":\"A01\",\"cat2\":\"A0101\",\"cat3\":\"A01010500\",\"contentid\":\"3067935\",\"contenttypeid\":\"12\",\"createdtime\":\"20231213163122\",\"firstimage\":\"http://tong.visitkorea.or.kr/cms/resource/33/3067933_image2_1.jpg\",\"firstimage2\":\"http://tong.visitkorea.or.kr/cms/resource/33/3067933_image3_1.jpg\",\"cpyrhtDivCd\":\"Type3\",\"mapx\":\"126.2981322290\",\"mapy\":\"36.6717653569\",\"mlevel\":\"6\",\"modifiedtime\":\"20231213163150\",\"sigungucode\":\"14\",\"tel\":\"\",\"title\":\"남면 벚꽃길\"},{\"addr1\":\"충청북도 충주시 동량면 지등로 709\",\"addr2\":\"\",\"areacode\":\"33\",\"booktour\":\"\",\"cat1\":\"A01\",\"cat2\":\"A0101\",\"cat3\":\"A01010500\",\"contentid\":\"3075171\",\"contenttypeid\":\"12\",\"createdtime\":\"20231123172434\",\"firstimage\":\"http://tong.visitkorea.or.kr/cms/resource/59/3075159_image2_1.jpg\",\"firstimage2\":\"http://tong.visitkorea.or.kr/cms/resource/59/3075159_image3_1.jpg\",\"cpyrhtDivCd\":\"Type3\",\"mapx\":\"127.9950505319\",\"mapy\":\"37.0086289453\",\"mlevel\":\"6\",\"modifiedtime\":\"20231226164134\",\"sigungucode\":\"11\",\"tel\":\"\",\"title\":\"충주댐벚꽃길\"},{\"addr1\":\"전라남도 순천시 민속마을길 150 (덕월동)\",\"addr2\":\"\",\"areacode\":\"38\",\"booktour\":\"\",\"cat1\":\"A01\",\"cat2\":\"A0101\",\"cat3\":\"A01010500\",\"contentid\":\"3076316\",\"contenttypeid\":\"12\",\"createdtime\":\"20231122154706\",\"firstimage\":\"\",\"firstimage2\":\"\",\"cpyrhtDivCd\":\"\",\"mapx\":\"127.4722616958\",\"mapy\":\"34.9207459152\",\"mlevel\":\"6\",\"modifiedtime\":\"20231228134109\",\"sigungucode\":\"11\",\"tel\":\"\",\"title\":\"낙안읍성 벚꽃길\"},{\"addr1\":\"전북특별자치도 익산시 목천동\",\"addr2\":\"\",\"areacode\":\"37\",\"booktour\":\"\",\"cat1\":\"A02\",\"cat2\":\"A0203\",\"cat3\":\"A02030400\",\"contentid\":\"3082699\",\"contenttypeid\":\"12\",\"createdtime\":\"20231025172018\",\"firstimage\":\"http://tong.visitkorea.or.kr/cms/resource/93/3082693_image2_1.JPG\",\"firstimage2\":\"http://tong.visitkorea.or.kr/cms/resource/93/3082693_image3_1.JPG\",\"cpyrhtDivCd\":\"Type3\",\"mapx\":\"126.9208154006\",\"mapy\":\"35.9193372917\",\"mlevel\":\"6\",\"modifiedtime\":\"20240408141629\",\"sigungucode\":\"9\",\"tel\":\"\",\"title\":\"전군가도100리벚꽃길\"},{\"addr1\":\"경기도 용인시 처인구 포곡읍 가실리\",\"addr2\":\"212-1\",\"areacode\":\"31\",\"booktour\":\"\",\"cat1\":\"A02\",\"cat2\":\"A0203\",\"cat3\":\"A02030600\",\"contentid\":\"3023389\",\"contenttypeid\":\"12\",\"createdtime\":\"20231024111743\",\"firstimage\":\"\",\"firstimage2\":\"\",\"cpyrhtDivCd\":\"\",\"mapx\":\"127.1923454131\",\"mapy\":\"37.2933147810\",\"mlevel\":\"6\",\"modifiedtime\":\"20231024111814\",\"sigungucode\":\"23\",\"tel\":\"\",\"title\":\"가실벚꽃길\"},{\"addr1\":\"울산광역시 남구 무거동\",\"addr2\":\"삼호로 15\",\"areacode\":\"7\",\"booktour\":\"\",\"cat1\":\"A02\",\"cat2\":\"A0203\",\"cat3\":\"A02030400\",\"contentid\":\"3074623\",\"contenttypeid\":\"12\",\"createdtime\":\"20230925135400\",\"firstimage\":\"http://tong.visitkorea.or.kr/cms/resource/22/3074622_image2_1.jpg\",\"firstimage2\":\"http://tong.visitkorea.or.kr/cms/resource/22/3074622_image3_1.jpg\",\"cpyrhtDivCd\":\"Type3\",\"mapx\":\"129.2649074229\",\"mapy\":\"35.5479687810\",\"mlevel\":\"6\",\"modifiedtime\":\"20231226123257\",\"sigungucode\":\"2\",\"tel\":\"\",\"title\":\"무거천 벚꽃길\"},{\"addr1\":\"부산광역시 부산진구 개금동\",\"addr2\":\"765\",\"areacode\":\"6\",\"booktour\":\"\",\"cat1\":\"A01\",\"cat2\":\"A0101\",\"cat3\":\"A01010500\",\"contentid\":\"3032396\",\"contenttypeid\":\"12\",\"createdtime\":\"20230922142256\",\"firstimage\":\"http://tong.visitkorea.or.kr/cms/resource/73/3032373_image2_1.JPG\",\"firstimage2\":\"http://tong.visitkorea.or.kr/cms/resource/73/3032373_image3_1.JPG\",\"cpyrhtDivCd\":\"Type3\",\"mapx\":\"129.0164402096\",\"mapy\":\"35.1462842377\",\"mlevel\":\"6\",\"modifiedtime\":\"20240516145857\",\"sigungucode\":\"7\",\"tel\":\"\",\"title\":\"개금벚꽃문화길\"},{\"addr1\":\"경기도 광주시 남종면 귀여리\",\"addr2\":\"324-2\",\"areacode\":\"31\",\"booktour\":\"\",\"cat1\":\"A03\",\"cat2\":\"A0302\",\"cat3\":\"A03022700\",\"contentid\":\"3075919\",\"contenttypeid\":\"12\",\"createdtime\":\"20230919110914\",\"firstimage\":\"\",\"firstimage2\":\"\",\"cpyrhtDivCd\":\"\",\"mapx\":\"127.3183168215\",\"mapy\":\"37.5061535058\",\"mlevel\":\"6\",\"modifiedtime\":\"20240517113254\",\"sigungucode\":\"5\",\"tel\":\"\",\"title\":\"귀여리벚꽃길\"},{\"addr1\":\"전라남도 여수시 화양면 장수리\",\"addr2\":\"\",\"areacode\":\"38\",\"booktour\":\"\",\"cat1\":\"A01\",\"cat2\":\"A0101\",\"cat3\":\"A01010500\",\"contentid\":\"3013553\",\"contenttypeid\":\"12\",\"createdtime\":\"20230905191554\",\"firstimage\":\"\",\"firstimage2\":\"\",\"cpyrhtDivCd\":\"\",\"mapx\":\"127.5654792234\",\"mapy\":\"34.6732225014\",\"mlevel\":\"6\",\"modifiedtime\":\"20230920175313\",\"sigungucode\":\"13\",\"tel\":\"\",\"title\":\"화양면 벚꽃길\"}]},\"numOfRows\":10,\"pageNo\":2,\"totalCount\":70}}}";
        ObjectMapper mapper = new ObjectMapper();

        try {
            LocationOverview locationOverview = mapper.readValue(json, LocationOverview.class);
            if (locationOverview.getResponse() == null) {
                System.out.println("Response 객체가 null입니다.");
            } else if (locationOverview.getResponse().getBody() == null) {
                System.out.println("Body 객체가 null입니다.");
            } else if (locationOverview.getResponse().getBody().getItems() == null) {
                System.out.println("Items 객체가 null입니다.");
            } else {
                List<LocationOverview.Item> itemList = locationOverview.getResponse().getBody().getItems().getItem();
                if (itemList == null || itemList.isEmpty()) {
                    System.out.println("Item 리스트가 null이거나 비어있습니다.");
                } else {
                    System.out.println("Item 리스트가 제대로 초기화되었습니다.");
                    for (LocationOverview.Item item : itemList) {
                        System.out.println(item);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
