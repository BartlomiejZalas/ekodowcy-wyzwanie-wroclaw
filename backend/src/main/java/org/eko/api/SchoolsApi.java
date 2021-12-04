package org.eko.api;

import lombok.RequiredArgsConstructor;
import org.eko.domain.dto.SchoolData;
import org.eko.domain.dto.SchoolScoreView;
import org.eko.domain.dto.SchoolView;
import org.eko.service.SchoolService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ValidationException;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class SchoolsApi {
    private final SchoolService schoolService;

    @GetMapping("/public/schools/ranking")
    public List<SchoolScoreView> getSchoolsRanking(@RequestParam(value = "limit", required = false) Integer limit) {
        if (limit != null) {
            return schoolService.getSchoolsScores().stream().limit(limit).collect(Collectors.toList());
        } else {
            return schoolService.getSchoolsScores();
        }

    }


    @GetMapping("/public/schools")
    public List<SchoolView> getSchools() {
        return schoolService.getSchools();
    }

    //    @RolesAllowed(Role.ADMIN)
//    @PostMapping(value = "/schools", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PostMapping(value = "/public/schools", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SchoolData> loadSchools(@RequestParam("file") final MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            BufferedReader br = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(inputStream.readAllBytes()), "UTF-8"));
            List<SchoolData> schoolDataList = new ArrayList<>();

            String line = br.readLine();
            // Reading header, Ignoring
            while ((line = br.readLine()) != null && !line.isEmpty()) {
                line = line.replaceAll(" +", " ");
                SchoolData current = new SchoolData();
                String[] fields = line.split(",");
                current.setPoisId(Integer.parseInt(fields[0]));
                current.setGroup(fields[1]);
                current.setSubgroup(fields[2]);
                current.setName(fields[3]);
                current.setAddress(fields[4]);
                current.setPostCode(fields[5]);
                current.setStatus(fields[6]);
                current.setChildren(Integer.parseInt(fields[7]));
                current.setUnits(Integer.parseInt(fields[8]));
                current.setType(fields[9]);
                current.setX(Double.parseDouble(fields[10]));
                current.setY(Double.parseDouble(fields[10]));
                schoolDataList.add(current);
            }

            schoolService.saveSchoolData(schoolDataList);

            return schoolDataList;
        } catch (IOException e) {
            throw new ValidationException(String.format("Cannot read file %s.", file.getOriginalFilename()));
        }
    }

}
