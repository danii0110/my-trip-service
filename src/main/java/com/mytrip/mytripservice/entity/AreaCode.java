package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class AreaCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;
    private String areacode;
    private String sigungucode;
    private String name;

    public AreaCode(String areacode, String sigungucode, String name) {
        this.areacode = areacode;
        this.sigungucode = sigungucode;
        this.name = name;
    }
}
