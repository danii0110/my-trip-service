// PlaceRepository.java
package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
}
