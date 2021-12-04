package org.eko.repository;

import org.eko.domain.model.Alert;
import org.eko.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long>, JpaSpecificationExecutor<Alert> {
    List<Alert> findByTimeBetween(Long start, Long end);
    List<Alert> findByTimeGreaterThanEqual(Long start);
    List<Alert> findByTimeLessThanEqual(Long end);
    List<Alert> findByUser(User user);

}
