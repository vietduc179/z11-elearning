/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vietduc
 */
@Entity
@Table(catalog = "z11_elearning", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Rolepermission.findAll", query = "SELECT r FROM Rolepermission r")
    , @NamedQuery(name = "Rolepermission.findById", query = "SELECT r FROM Rolepermission r WHERE r.id = :id")
    , @NamedQuery(name = "Rolepermission.findByRolecode", query = "SELECT r FROM Rolepermission r WHERE r.rolecode = :rolecode")
    , @NamedQuery(name = "Rolepermission.findByPmscode", query = "SELECT r FROM Rolepermission r WHERE r.pmscode = :pmscode")
    , @NamedQuery(name = "Rolepermission.findByCreatedtime", query = "SELECT r FROM Rolepermission r WHERE r.createdtime = :createdtime")})
public class Rolepermission implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(nullable = false, length = 50)
    private String rolecode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 254)
    @Column(nullable = false, length = 254)
    private String pmscode;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdtime;

    public Rolepermission() {
    }

    public Rolepermission(Integer id) {
        this.id = id;
    }

    public Rolepermission(Integer id, String rolecode, String pmscode) {
        this.id = id;
        this.rolecode = rolecode;
        this.pmscode = pmscode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRolecode() {
        return rolecode;
    }

    public void setRolecode(String rolecode) {
        this.rolecode = rolecode;
    }

    public String getPmscode() {
        return pmscode;
    }

    public void setPmscode(String pmscode) {
        this.pmscode = pmscode;
    }

    public Date getCreatedtime() {
        return createdtime;
    }

    public void setCreatedtime(Date createdtime) {
        this.createdtime = createdtime;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Rolepermission)) {
            return false;
        }
        Rolepermission other = (Rolepermission) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Rolepermission[ id=" + id + " ]";
    }
    
}
