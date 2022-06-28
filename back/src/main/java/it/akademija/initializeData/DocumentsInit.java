package it.akademija.initializeData;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;

import it.akademija.document.DocumentDAO;
import it.akademija.document.DocumentEntity;
import it.akademija.user.UserDAO;

@Component
@DependsOn("usersInit")
public class DocumentsInit {

    @Autowired
    UsersInit usersInit;
    
    @Autowired
    UserDAO userDAO;

    @Autowired
    DocumentDAO documentDAO;

    /**
     * Initialize documents data
     * 
     * @throws IOException
     */
    @PostConstruct
    public void uploadDocumentsData() throws IOException, DocumentException {

//	if (documentDAO.findAll().size() < 10) {
//	    ClassLoader classLoader = getClass().getClassLoader();
//	    InputStream inputStream = classLoader.getResourceAsStream("initial_data/users_data.txt");
//	    String FONT = "times.ttf";
//	    
//	    try (BufferedReader reader = new BufferedReader(
//		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
//		String line;
//		line = reader.readLine(); // Skip first line
//		
//		while ((line = reader.readLine()) != null) {
//		    String[] data = line.split(";");
//		    long uploaderId = userDAO.findByUsername(data[5]).getUserId();
//		    String documentName = data[6] + " " + data[1] + ", pažyma.pdf";
//		    
//		    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//		    Document document = new Document();
//		    PdfWriter.getInstance(document, byteArrayOutputStream);
//		    document.open();
//		    BaseFont baseFont = BaseFont.createFont(FONT, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
//		    Font font = new Font(baseFont, 16);
//		    Chunk chunk = new Chunk(data[6] + " " + data[1] + " yra pažymėta(s)", font);
//		    document.add(chunk);
//		    document.close();
//		    
//		    byte[] pdfBytes = byteArrayOutputStream.toByteArray();
//		    DocumentEntity documentEntity = new DocumentEntity();
//		    documentEntity.setName(documentName);
//		    documentEntity.setType("application/pdf");
//		    documentEntity.setSize(pdfBytes.length);
//		    documentEntity.setData(pdfBytes);
//		    documentEntity.setUploaderId(uploaderId);
//		    documentEntity.setUploadDate(LocalDate.now());
//		    
//		    documentDAO.save(documentEntity);
//		}
//	    }
//	}
    }
}
