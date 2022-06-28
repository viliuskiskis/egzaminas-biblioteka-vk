package it.akademija.application.queue;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "application queue")
@RequestMapping(path = "/api/eile")
public class ApplicationQueueController {

    @Autowired
    private ApplicationQueueService queueService;

    /**
     * Get page from processed application queue sorted by child surname and name,
     * filtered by child personal code
     * 
     * @param page   - page number
     * @param size   - number of entries in a page
     * @param filter - part of child personal code from start
     * @return page of sorted and filtered applictaion queue information
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager/queue")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get page from processed application queue "
	    + "sorted by child surname and name, filtered by child personal code")
    public ResponseEntity<Page<ApplicationQueueInfo>> getApplicationQueueInformation(
	    @RequestParam(value = "page", required = false, defaultValue = "0") int page,
	    @RequestParam(value = "size", required = false, defaultValue = "10") int size,
	    @RequestParam(value = "filter", required = false, defaultValue = "") String filter) {

	List<Order> orders = new ArrayList<>();
	orders.add(new Order(Direction.ASC, "childSurname").ignoreCase());
	orders.add(new Order(Direction.ASC, "childName").ignoreCase());

	Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

	return new ResponseEntity<>(queueService.getApplicationQueueInformation(pageable, filter.trim()),
		HttpStatus.OK);
    }

    public ApplicationQueueService getQueueService() {
	return queueService;
    }

    public void setQueueService(ApplicationQueueService queueService) {
	this.queueService = queueService;
    }

}
