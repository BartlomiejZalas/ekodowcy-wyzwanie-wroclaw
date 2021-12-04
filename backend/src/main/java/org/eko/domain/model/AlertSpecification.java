package org.eko.domain.model;

import lombok.Value;
import org.eko.domain.dto.SearchAlertQuery;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Value
public class AlertSpecification implements Specification<Alert> {
    private static final long serialVersionUID = -2941841645962394037L;
    SearchAlertQuery searchAlertQuery;

    @Override
    public Predicate toPredicate(Root<Alert> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();

        if(searchAlertQuery.getCategory() != null){
            predicates.add(builder.equal(root.get("category"), searchAlertQuery.getCategory()));
        }
        if (searchAlertQuery.getStartTimestamp() != null){
            predicates.add(builder.greaterThanOrEqualTo(root.get("time"), searchAlertQuery.getStartTimestamp()));
        }
        if (searchAlertQuery.getEndTimestamp() != null){
            predicates.add(builder.lessThanOrEqualTo(root.get("time"), searchAlertQuery.getEndTimestamp()));
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }
}
