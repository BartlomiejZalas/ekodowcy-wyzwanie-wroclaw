package org.eko.service;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.SchoolData;
import org.eko.domain.dto.SchoolScoreView;
import org.eko.domain.dto.SchoolView;
import org.eko.domain.model.School;
import org.eko.domain.model.SchoolScore;
import org.eko.repository.SchoolRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;

    public List<SchoolScoreView> getSchoolsScores(){
        List<SchoolScore> schoolsScoreList = schoolRepository.getSchoolsScore();
        return schoolsScoreList.stream()
                .map(s -> new SchoolScoreView(s.getSchoolId(), s.getSchoolName(), s.getScore()))
                .collect(Collectors.toList());
    }

    public List<SchoolView> getSchools() {
        List<School> schools = schoolRepository.findAll();
        return schools.stream().map(s -> new SchoolView(s.getId(), s.getName())).collect(Collectors.toList());
    }

    @Transactional
    public void saveSchoolData(List<SchoolData> schoolDataList) {
        List<School> schools = schoolRepository.findAll();

        Map<Long, School> schoolsByPoisId = schools.stream().collect(Collectors.toMap(School::getPoisId, Function.identity()));
        Map<Integer, SchoolData> schoolDataByPoisId = schoolDataList.stream().collect(Collectors.toMap(SchoolData::getPoisId, Function.identity()));

        for (Map.Entry<Integer, SchoolData> entry : schoolDataByPoisId.entrySet()) {
            Long poisId = entry.getKey().longValue();
            SchoolData schoolData = entry.getValue();
            School schoolWithGivenPostId = schoolsByPoisId.get(poisId);
            if (schoolWithGivenPostId == null) {
                schoolRepository.save(new School(schoolData.getName(), poisId));
            } else if (!schoolData.getName().equals(schoolWithGivenPostId.getName())){
                schoolWithGivenPostId.setName(schoolData.getName());
                schoolRepository.save(schoolWithGivenPostId);
            }
        }
    }
}
