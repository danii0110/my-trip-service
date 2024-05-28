package com.mytrip.mytripservice.model;

import lombok.Data;
import java.util.List;

@Data
public class LocationDetail {
    private Response response;

    @Data
    public static class Response {
        private Header header;
        private Body body;
    }

    @Data
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    public static class Body {
        private Items items;
        private int numOfRows;
        private int pageNo;
        private int totalCount;
    }

    @Data
    public static class Items {
        private List<Item> item;
    }

    @Data
    public static class Item {
        private String contentid;
        private String contenttypeid;
        private String heritage1;
        private String heritage2;
        private String heritage3;
        private String infocenter;
        private String opendate;
        private String restdate;
        private String expguide;
        private String expagerange;
        private String accomcount;
        private String useseason;
        private String usetime;
        private String parking;
        private String chkbabycarriage;
        private String chkpet;
        private String chkcreditcard;
        private String scale;
        private String usefee;
        private String discountinfo;
        private String spendtime;
        private String parkingfee;
        private String infocenterculture;
        private String accomcountculture;
        private String usetimeculture;
        private String restdateculture;
        private String parkingculture;
        private String chkbabycarriageculture;
        private String chkpetculture;
        private String chkcreditcardculture;
        private String goodstay;
        private String benikia;
        private String hanok;
        private String roomcount;
        private String roomtype;
        private String refundregulation;
        private String checkintime;
        private String checkouttime;
        private String chkcooking;
        private String seminar;
        private String sports;
        private String sauna;
        private String beauty;
        private String beverage;
        private String karaoke;
        private String barbecue;
        private String campfire;
        private String bicycle;
        private String fitness;
        private String publicpc;
        private String publicbath;
        private String subfacility;
        private String foodplace;
        private String reservationurl;
        private String pickup;
        private String infocenterlodging;
        private String parkinglodging;
        private String reservationlodging;
        private String scalelodging;
        private String accomcountlodging;
    }

}
